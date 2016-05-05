const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const transporter = nodemailer.createTransport(smtpTransport(config.base.smtpConfig));

/**
 * Send an email
 * @param {Object} data 邮件对象
 */
let sendMail = function (data,cb) {
  transporter.sendMail(data, function (err) {
    if (err) {
      cb(err)
    }
  });
};

/**
 * 发送密码重置通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
exports.sendResetPassMail = function (who, token, name, cb) {
  var from = util.format('%s <%s>', config.base.name, config.mail_opts.auth.user);
  var to = who;
  var subject = '密码重置';
  var html = '<p>您好：' + name + '</p>' +
    '<p>我们收到您在' + config.base.name + '重置密码的请求：</p>' +
    '<p>您的验证码是: ' + token + '</p>' +
    '<p>谨上。</p>';

  // sendMail({
  //   from: from,
  //   to: to,
  //   subject: subject,
  //   html: html
  // }, cb);

  transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  },function (err,info) {
    if (err) {
      console.log(err)
      cb(err);
    }
    console.log('Message sent: ' + info.response);
  })
  console.log('sdfsfsdf')
};
