const cors = require('cors')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const wbpkconfig = require('../webpack/webpack.client.dev.js');
const node_env = process.env.NODE_ENV || 'development'
const staticDir = path.join(__dirname, '..', 'public')
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
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: wbpkconfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

//
// express 配置
// -----------------------------------------------------------------------------
app.use(cors())
app.use(require('method-override')('_method'))
app.use('/', express.static(staticDir));
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
app.set('views', './view')
app.set('view engine', 'pug');

//
// 设置api 路由
// -----------------------------------------------------------------------------
app.use('/v1/api', require('./api'))

//
// 由于前端使用spa 所以所有的路由都指向 首页
// -----------------------------------------------------------------------------
app.get('*', (req, res, next) => {
  res.render('index');
})

app.listen(config.base.port,function () {
  console.log('Listen on port %s', config.base.port)
})
