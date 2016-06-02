const roleControll = require('../config/roleControll')
// 住户生活相关

// 充值用户金额或增加水电费
module.exports.topUpAmount = function (req, res) {
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

  let query = models.Amount.findOne({destroyedAt: null})
  query.where('uid').equals(req.body.uid)
  query.exec().then(function (data) {
    if (!data) {
      return res.send({
        status: 1,
        message: '账号不存在'
      })
    }

    let opts
    if (req.body.amount) {
      let amount = Number(req.body.amount)
      console.log(typeof amount);
      opts = {
        amount: amount + data.amount
      }
    } else if (req.body.water) {
      let water = Number(req.body.water)
      opts = {
        water: water + data.water
      }
    } else {
      let energy = Number(req.body.energy)
      opts = {
        energy : energy + data.energy
      }
    }
    console.log(opts);
    data.update({$set: opts}, function (err) {
      if (err) {
        res.send({
          status: 1,
          message: '操作失败，请重试'
        })
      }
      res.send({
        status: 0,
        message: '操作成功'
      })
    })
  })
}

// 用户缴费
module.exports.deductAmount = function (req, res) {
  if (!req.session.user) {
    res.send({
      status: 1,
      message: '请先登录'
    })
  }
  if (!roleControll.deductAmount.role.includes(req.session.user.role)) {
    res.send({
      status: 1,
      message: '您没有权限'
    })
  }

  let query = models.Amount.findOne({destroyedAt: null})
  query.where('uid').equals(req.body.uid)
  query.exec().then(function (amount) {
    if (!amount) {
      res.send({
        status: 1,
        message: '账号不存在'
      })
    }

    amount = amount - amount.water - amount.energy
    amount.update({$set: [{amount}, {water: 0}, {energy: 0}]}, function (err) {
      if (err) {
        res.send({
          status: 1,
          message: '操作失败，请重试'
        })
      }
      res.send({
        status: 0,
        message: '操作成功'
      })
    })
  })
}

// 查看剩余金额
module.exports.readAmount = function (req, res) {
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

  let query = models.Amount.findOne({destroyedAt: null})
  let uid
  if (req.session.user.role != 'resident') {
    uid = req.params.uid
  } else {
    uid = req.session.user.id
  }
  query.where('uid').equals(uid)
  query.exec().then(function (amount) {
    if (!amount) {
      res.send({
        status: 1,
        message: '账号不存在'
      })
    }
    res.send({
      status: 0,
      message: amount
    })
  })
}
