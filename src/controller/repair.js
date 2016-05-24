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

  req.query.uid = req.query.uid || req.session.user.id
  models.Repair.find().then(function (repairs) {
    if (!repairs || repairs.length === 0) {
      res.send({
        status: 1,
        message: '查询失败'
      })
    } else {
      console.log(repairs);
      res.send({
        status: 0,
        message: repairs
      })
    }
  })
}
