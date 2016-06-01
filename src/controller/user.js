const bcrypt = require('bcrypt')
const validator = require('validator')
const gen_fuc = require('../common/gen').gen_fuc
const sendMail = require('../common/sendMail').sendResetPassMail
const roleControll = require('../config/roleControll')
const debug = require('debug')('Maple')
// 用户注册
module.exports.signup = function (req, res) {
  if (req.session.user && roleControll.createUser.role.includes(req.session.user.role)) {
    if (!req.body.role) {
      res.send({
        status: 1,
        message: '请输入用户角色'
      })
    }
  } else {
    req.body.role = 'resident'
  }
  if (req.body.code) {
    if (req.session.code != req.body.code) {
      res.send({
        status: 1,
        message: '验证码错误'
      })
    }
  }
  if (!req.body.name) {
    req.body.name = req.body.username
  }
  let user = new models.User(req.body)
  let amount = new models.Amount({ uid: user.id })
  let detail = new models.Detail({ uid: user.id })
  user.save((err) => {
    if (err) {
      debug(err)
        res.send({
          status: 1,
          message: '请输入完整内容'
        })

    } else {
      amount.save((err)=>{debug(err)})
      detail.save((err)=>debug(err))
      res.send({
        status: 0,
        message:'创建用户成功'
      })
    }
  })
}
// 用户登录
module.exports.signin = function (req, res) {
  let query = models.User.findOne()

  if (validator.isEmail(req.body.username)) {
    query.where('email').equals(req.body.username)
  } else if (validator.isMobilePhone(req.body.username, 'zh-CN')) {
    query.where('phone').equals(req.body.username)
  } else {
    query.where('username').equals(req.body.username)
  }

  query.exec().then(function (user) {
    if(user) {
      bcrypt.compare(req.body.password, user.password, function (err, status) {
        if (err || !status) {
          res.send({
            status: 1,
            message: '密码或用户名错误'
          })
        } else {
          req.session.user = {
            id : user.id,
            name: user.name,
            role: user.role,
            email: user.email
          }
          res.cookie('username', user.name)
          res.cookie('role', user.role)
          res.send({
            status: 0,
            message: '登陆成功',
            isLogin: true
          })
        }
      })
    } else {
      res.send({
        status: 1,
        message: '没有此用户'
      })
    }

  })
}

// 注销登陆
module.exports.signout = function (req, res) {
  req.session.destroy()
  res.clearCookie('maple-session', { path: '/' })
  res.clearCookie('username')
  res.redirect('/login')
}

// 发送验证码
module.exports.getEmailCode = function (req, res) {
  let code = gen_fuc()
  let username = req.body.username
  if (req.body.email) {
    let email = req.body.email
    req.session.code = code
    sendMail(email, code, '用户', function(err) {
      console.log(err);
      if (err) {

        res.send({
          status: 1,
          message: '发送失败'
        })
      } else {
        res.send({
          status: 0,
          message: '发送成功'
        })
      }
    })
  } else {
    models.User.findOne({username}).then(function (user) {
      if (!user) {
        res.send({
          status: 1,
          message: '没有此用户'
        })
      } else {
        req.session.code = code
        sendMail(user.email, code, user.name, function(err) {
          if (err) {
            debug(err)
            res.send({
              status: 1,
              message: '发送失败'
            })
          } else {
            res.send({
              status: 0,
              message: '发送成功'
            })
          }
        })
      }
    })
  }
}

// 找回密码
module.exports.updatePassword = function (req, res) {
  let {code, username, password, passwordConfirmation} = req.body

  if (code != req.session.code) {
    res.send({message: '验证码验证不匹配'})
  } else {
    models.User.findOne({username}).then(function (user) {
      if (!user) {
        res.send({
          status: 1,
          message: '没有此用户'
        })
      } else {
        user.findPasswordByCode(password, passwordConfirmation, function (err, message) {
          if (err) {
            res.send(err)
          } else {
            res.send(message)
          }
        })
      }
    })
  }
}

// 删除用户
module.exports.deleteUser = function (req, res) {
  if (!roleControll.deleteUser.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  models.User.findOne({_id: req.body.id}).then(function (user) {
    if (!user) {
      res.send({
        status: 1,
        message: '没有此用户'
      })
    }

    user.update({$set: {destroy: true}}, function (err) {
      if (err) {
        res.send({
          status: 1,
          message: '删除失败，请重试'
        })
      } else {
        res.send({
          status: 0,
          message: '删除成功'
        })
      }
    })
  })
}

// 修改用户信息
module.exports.modifyUser = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  } else if (!roleControll.modifyUser.role.includes(req.session.user.role)) {
    if (req.body.uid) {
      res.send({
        status: 1,
        message: '您没有权限'
      })
    }
  }

  if (req.body.password) {
    res.send({
      status: 1,
      message: '您没有权限修改用户密码'
    })
  }

  let userId = req.body.id || req.session.user.id
  models.Detail.findOne({uid: userId}).then(function (user) {
    if (!user || user.read === true) {
      res.send({
        status: 1,
        message: '没有此用户或已经认证无法修改'
      })
    }
    console.log(req.body);
    user.update({ $set: req.body }, function (err) {
      if (err) {
        res.send({
          status: 1,
          message: '更新失败'
        })
      } else {
        res.send({
          status: 0,
          message: '修改成功'
        })
      }
    })
  })
}

// 查看用户信息
module.exports.readUser = function (req, res) {
  if (!req.session.user) {
    req.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.readUser.role.includes(req.session.user.role)) {
    if (req.body.id) {
      req.send({
        status: 1,
        message: '您没有权限'
      })
    }
  }

  let userId = req.body.id || req.session.user.id
  models.User.findOne({_id: userId}).then(function (user) {
    if (!user) {
      res.send({
        status: 1,
        message: '没有此用户'
      })
    }
    let data = {
      email: user.email,
      username: user.username,
      phone: user.phone,
      name: user.name,
      role: user.role
    }
    res.send({
      status: 0,
      message: data
    })
  })
}

// 获取用户列表
module.exports.getUserList = function (req, res) {
  if (!req.session.user) {
    req.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.getUserList.role.includes(req.session.user.role)) {
    req.send({
      status: 1,
      message: '您没有权限'
    })
  }

  let query = models.User.find( { destroy: false } )
  query.where('role').equals(req.body.role)
  query.exec().then(function (users) {
    let length = users.length
    let data = []
    for (let i = 0; i < length; i++) {
      let user = {
        email: users[i].email,
        username: users[i].username,
        phone: user.phone,
        name: users[i].name,
        role: users[i].role
      }
      data.push(user)
    }
    res.send({
      status: 0,
      message: data
    })
  })
}

// 查找用户
module.exports.findUser = function (req, res) {
  if (!req.session.user) {
    req.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.findUser.role.includes(req.session.user.role)) {
    req.send({
      status: 1,
      message: '您没有权限'
    })
  }

  let query = models.User.findOne({destroy: false})
  if (validator.isEmail(req.body.username)) {
    query.where('email').equals(req.body.username)
  } else if (validator.isMobilePhone(req.body.username, 'zh-CN')) {
    query.where('phone').equals(req.body.username)
  } else {
    query.where('username').equals(req.body.username)
  }

  query.exec().then(function (user) {
    if (!user) {
      res.send({
        status: 1,
        message: '没有此用户'
      })
    }
    let data = {
      email: user.email,
      username: user.username,
      phone: user.phone,
      name: user.name,
      role: user.role
    }
    res.send({
      status: 0,
      message: data
    })
  })
}

// 获取用户详情
module.exports.getDetail = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.findUser.role.includes(req.session.user.role)) {
    if (req.query.uid && req.query.uid != req.session.user.id) {
      req.send({
        status: 1,
        message: '您没有权限'
      })
    }
  }
  let uid = req.query.uid || req.session.user.id
  debug(uid)
  models.Detail.findOne({
    uid: uid
  }).then(function(user) {
    debug('2222222222222')
    debug(user)
    if (!user) {
      res.send({
        status: 1,
        message: '没用此用户'
      })
    } else {
      res.send({
        status: 0,
        message: user
      })
    }
  })
}
