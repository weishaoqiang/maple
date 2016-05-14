const email = require('emailjs');
const server  = email.server.connect({
  user:    "1260302891@qq.com",
  password:"guhuanian199311",
  host:    "smtp.qq.com",
  ssl:     true
});

module.exports.sendResetPassMail = function (who, token, name, cb) {
  let text = `尊敬的用户:${name}
              我们收到您在${config.base.name}修改密码的请求。
              您的验证码是:${token}
              请不要告诉他人`
  let from = `${config.base.name} <1260302891@qq.com>`
  let to = who
  let subject = '验证码'
  server.send({
    text,from,to,subject
  }, cb)
}
