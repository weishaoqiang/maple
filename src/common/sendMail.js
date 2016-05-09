const email = require('emailjs');
const server  = email.server.connect({
  user:    "1260302891@qq.com",
  password:"guhuanian199311",
  host:    "smtp.qq.com",
  ssl:     true
});

// server.send({
//    text:    "i hope this works",
//    from:    "you <1260302891@qq.com>",
//    to:      "guhuanian <huanianfeng@sina.com>",
//    subject: "testing emailjs"
// }, function(err, message) { console.log(err || message); });

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

// /**
//  * 发送密码重置通知邮件
//  * @param {String} who 接收人的邮件地址
//  * @param {String} token 重置用的token字符串
//  * @param {String} name 接收人的用户名
//  */
// exports.sendResetPassMail = function (who, token, name, cb) {
//   var from = util.format('%s <%s>', config.base.name, config.mail_opts.auth.user);
//   var to = 'huanianfeng@sina.com';
//   var subject = '密码重置';
//   var html = '<p>您好：' + name + '</p>' +
//     '<p>我们收到您在' + config.base.name + '重置密码的请求：</p>' +
//     '<p>您的验证码是: ' + token + '</p>' +
//     '<p>谨上。</p>';
//
//   // sendMail({
//   //   from: from,
//   //   to: to,
//   //   subject: subject,
//   //   html: html
//   // }, cb);
//
//   transporter.sendMail({
//     from: from,
//     to: to,
//     subject: subject,
//     html: html
//   },function (err,info) {
//     if (err) {
//       console.log(err)
//       cb(err);
//     }
//     console.log('Message sent: ' + info.response);
//   })
//   console.log('sdfsfsdf')
