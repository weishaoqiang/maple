const roleControll = require('../config/roleControll')
const debug = require('debug')('Maple')

module.exports.index = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.readAmount.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  models.Check.find({ destroyedAt: null, sourceUid: req.session.user.id }).then(function (data) {
    if (data.length === 0 || !data) {
      res.send({
        status: 1,
        message: '没有数据'
      })
    } else {
      res.send({
        status: 0,
        message: data
      })
    }
  })

}
