module.exports = {
  name: '小区网站公众服务品台',
  description: '',
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGODB || 'mongodb://localhost/weisq',
  sessionSecret: process.env.SESSION_SECRET || 'xiafeng37513',
  smtpConfig : {
    host: 'smtp.126.com',
    port: 25,
    auth: {
        user: 'mapleuncle@126.com',
        pass: 'mapleuncle37513'
    }
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    options: {
    }
  }
}
