module.exports = {
  name: '小区网站公众服务品台',
  description: '',
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGODB || 'mongodb://localhost/weisq',
  sessionSecret: process.env.SESSION_SECRET || 'xiafeng37513',
  smtpConfig : {
    use_authentication: true, //如果我们使用QQ等邮箱，这个必须写且为true
    host: 'smtp.qq.com',   //定义用来发送邮件的邮箱服务器，一般是QQ这些的
    port:25,    //定义服务器端口，一般是25   ,如果是使用SSL端口一般为465,或者587
    ssl:false,     //默认不适用SSL，可以省略不写
    user: '1260302891@qq.com',   //邮箱用户名
    pass: 'guhuanian199311'   //输入邮箱密码
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    options: {
    }
  }
}
