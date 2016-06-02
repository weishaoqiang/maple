const roleControll = require('../config/roleControll')
const debug = require('debug')('Maple')

module.exports.getRepair = function (req, res) {
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

  let query = {}
  if (req.session.user.role === 'resident') {
    query.sourceUid = req.session.user.id
  }
  models.Repair.find(query).populate('sourceUid').populate('uid').sort('-createdAt').then(function (repairs) {
    if (!repairs || repairs.length === 0) {
      res.send({
        status: 1,
        message: '查询失败'
      })
    } else {
      debug(repairs)
      res.send({
        status: 0,
        message: repairs
      })
    }
  })
}

module.exports.getComplaint= function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.getComplaint.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  let query = {}
  if (req.session.user.role === 'resident') {
    query.sourceUid = req.session.user.id
  }
  models.Complaint.find(query).populate('sourceUid').populate('uid').sort('-createdAt').then(function (complaints) {
    if (!complaints || complaints.length === 0) {
      res.send({
        status: 1,
        message: '查询失败'
      })
    } else {
      debug(complaints)
      res.send({
        status: 0,
        message: complaints
      })
    }
  })
}

module.exports.handComplaint = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.handComplaint.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }
  models.Complaint.findOne({_id: req.body.id}).then(function (complaint) {
    if (!complaint || complaint.length === 0) {
      res.send({
        status: 1,
        message: '查询失败'
      })
    } else {
      complaint.update({$set: { read: true, uid: req.session.user.id }}, function (err) {
        if (err) {
          res.send({
            status: 1,
            message: '更新失败，请重试'
          })
        } else {
          res.send({
            status: 0,
            message: '处理成功'
          })
        }
      })
    }
  })
}

module.exports.handRepair = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.handRepair.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }
  models.Repair.findOne({_id: req.body.id}).then(function (repair) {
    if (!repair || repair.length === 0) {
      res.send({
        status: 1,
        message: '查询失败'
      })
    } else {
      repair.update({$set: { read: true, uid: req.session.user.id }}, function (err) {
        if (err) {
          res.send({
            status: 1,
            message: '更新失败，请重试'
          })
        } else {
          res.send({
            status: 0,
            message: '处理成功'
          })
        }
      })
    }
  })
}
