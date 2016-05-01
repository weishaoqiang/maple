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

}
