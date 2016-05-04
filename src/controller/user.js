const bcrypt = require('bcrypt');
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
    bcrypt.compare(req.body.password, user.password, function (err, status) {
      if (err || !status) {
        res.send({
          status: 1,
          message: '密码或用户名错误'
        });
      } else {
        console.log(status)
        res.send({
          status: 0,
          message: '登陆成功',
          username,
          email,
          role: user.role,
          isLogin: true
        })
      }
    })
  })
}
