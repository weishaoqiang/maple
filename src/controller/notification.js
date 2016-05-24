const roleControll = require('../config/roleControll')
const debug = require('debug')('Maple')
// 通知类相关，包括小区通知，报修相关通知，投诉建议等

// 添加通知
module.exports.createNotification = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.createNotification.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  var repair;

  req.body.sourceUid = req.session.user.id
  if (req.body.type === 'repair') {
    var username = req.session.user.name;
    repair = new models.Repair({
      title: `${username}住户的报修`,
      message: req.body.message || '暂无报修的相关描述',
      sourceUid: req.session.user.id
    })
    req.body.id = repair._id;
  }
  models.Notification.notify(req.body, function (err) {
    if (err) {
      debug(`用户报修失败${err}`)
      res.send({
        status: 1,
        message: '报修错误..'
      })
    } else if (repair){
      repair.save(function (err) {
        if (err) {
          debug(`用户报修失败${err}`)
          res.send({
            status: 1,
            message: '报修错误...'
          })
        } else {
          res.send({
            status: 0,
            message: '发送推送成功'
          })
        }
      })
    } else {
      res.send({
        status: 0,
        message: '发送推送成功'
      })
    }
  })
}

// 查看通知
module.exports.readNotification = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.readNotification.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  let query = models.Notification.find({destroyedAt: null})
  query.where('_id').equals(req.params.id)
  query.exec().then(function (notification) {
    if (!notification) {
      res.send({
        status: 1,
        message: '通知不存在'
      })
    }
    res.send({
      status: 0,
      message: notification
    })
  })
}

// 更新通知
module.exports.updateNotification = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.updateNotification.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  let query = models.Notification.findOne({destroyedAt: null})
  query.where('_id').equals(req.body.id)
  query.exec().then(function (notification) {
    if (!notification) {
      res.send({
        status: 1,
        message: '通知不存在'
      })
    }
    if (req.body.read) {
      if (req.session.user.id != notification.uid) {
        res.send({
          status: 1,
          message: '您没有权限'
        })
      }
      notification.update({$set: {read: true}}, function (err) {
        if (err) {
          res.send({
            status: 1,
            message: '操作失败，请重试'
          })
        }
        res.send({
          status: 0,
          message: '更新成功'
        })
      })
    }
    if (req.body.finish) {
      if (req.session.user.id != notification.sourceUid) {
        res.send({
          status: 1,
          message: '您没有权限'
        })
      }
      notification.update({$set: {finish: true}}, function (err) {
        if (err) {
          res.send({
            status: 1,
            message: '操作失败，请重试'
          })
        }
        res.send({
          status: 0,
          message: '更新成功'
        })
      })
    }

  })
}

// 删除通知
module.exports.updateNotification = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.updateNotification.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  let query = models.Notification.findOne({destroyedAt: null})
  query.where('_id').equals(req.params.id)
  query.exec().then(function (notification) {
    if (!notification) {
      res.send({
        status: 1,
        message: '通知不存在'
      })
    }
    if (req.session.user.id != notification.sourceUid ||
      notification.read === true || notification.finish === true) {
      res.send({
        status: 1,
        message: '删除失败，已经无法删除'
      })
    }
    var time = new Date();
    notification.update({$set: {destroyedAt: time}}, function (err) {
      if (err) {
        res.send({
          status: 1,
          message: '操作失败，请重试'
        })
      }
      res.send({
        status: 0,
        message: '删除成功'
      })
    })
  })

}
