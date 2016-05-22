const cors = require('cors')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const debug = require('debug')('Maple')
const bodyParser = require('body-parser')
const session = require('express-session')
// const renderToString = require('react-dom').server
// const match = require('react-router').match
// const RoutingContext = require('react-router').RoutingContext
// const routes = require()
const RedisStore = require('connect-redis')(session)

const wbpkconfig = require('../webpack/webpack.client.dev.js');
const node_env = process.env.NODE_ENV || 'development'
const app = express()

//
// 配置全局变量，这能在这里配置，不允许在别处配置
// -----------------------------------------------------------------------------
global.config = require('./config')
global.models = require('./model')

//
// 配置webpack
// -----------------------------------------------------------------------------
if (node_env === 'development') {
  const compiler = webpack(wbpkconfig);
  debug('webpack is working')
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    stats: true,
    publicPath: wbpkconfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

//
// express 配置
// -----------------------------------------------------------------------------
app.use(cors())
app.use(require('method-override')('_method'))
app.set('views', path.join(__dirname,'view'))
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'maple-session',
  store: new RedisStore(config.base.redis),
  secret: config.base.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('response-time')())

//
// 设置api 路由
// -----------------------------------------------------------------------------
debug('加载api....')
app.use('/v1/api', require('./api'))
app.use('/v1/api', function (req, res, next) {
  res.send({
    status: 1,
    message: '没有此接口'
  })
})
//
// 由于前端使用spa 所以所有的路由都指向 首页
// -----------------------------------------------------------------------------
debug('加载路由。。。')
app.use('*', (req, res, next) => {
  res.render('index');
})

app.listen(config.base.port,function () {
  debug('Listen on port %s', config.base.port)
})
