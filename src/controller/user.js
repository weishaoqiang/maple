const bcrypt = require('bcrypt');
const gen_fuc = require('../common/gen').gen_fuc
const sendMail = require('../common/sendMail').sendResetPassMail
// 用户注册
module.exports.signup = function (req, res) {
  // 超级管理员注册用户
  if (req.session.user === 'system') {
    if (!req.body.role) {
      const data = {
        result: false,
        data: '没用设置用户角色'
      }
      res.send(data)
    }
  }

  const user = models.User(req.body);
  user.save((err) => {
    if (err) {
      res.send({
        result: false,
        data: err
      })
    } else {
      res.send({
        result: true,
        data:'创建用户成功'
      })
    }
  })
}
// 用户登录
module.exports.signin = function (req, res, next) {
  let query = models.User.findOne()
  let email = req.body.username
  let username = req.body.username
  query.or([{ email }, { username }])
  query.exec().then(function (user) {
    if(user) {
      bcrypt.compare(req.body.password, user.password, function (err, status) {
        if (err || !status) {
          res.send({
            status: 1,
            message: '密码或用户名错误'
          });
        } else {
          req.session.user = {
            id : user.id,
            name: user.name,
            role: user.role,
            email: user.email
          }
          res.cookie('username', user.name);
          res.send({
            status: 0,
            message: '登陆成功',
            username: user.name,
            email: user.email,
            role: user.role,
            isLogin: true
          })
        }
      })
    } else {
      res.send({
        status: 1,
        message: '没有此用户'
      });
    }

  })
}

// 注销登陆
module.exports.signout = function (req, res) {
  req.session.destroy();
  res.clearCookie('maple-session', { path: '/' });
  res.clearCookie('username');
  res.redirect('/login');
}

module.exports.getEmailCode = function (req, res) {
  let token = gen_fuc();
  let username = req.body.username
  models.User.findOne({}).then(function (user) {
    console.log(user)
    if (!user) {
      res.send({
        status: 1,
        message: '没有此用户'
      });
    } else {
      sendMail(user.email, token, user.name, function(err, message) {
        if (err) {
          res.send({
            status: 1,
            message: '发送失败'
          });
        } else {
          res.send({
            status: 0,
            message: '发送成功'
          });
        }
      } )
    }
  })
}
