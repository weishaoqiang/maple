const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const timestamps = require('mongoose-timestamp')
const uniqueValidator = require('mongoose-unique-validator')

const AmountSchema = new Schema({
  // 余额
  amount: { type: 'Number', default: 0 },
  // 需缴的水费
  water: { type: 'Number', default: 0 },
  // 需缴的电费
  energy: { type: 'Number', default: 0 },
  // 需缴的煤气费用
  gas: { type: 'Number', default: 0 },
  // 关联用户
  uid: { type: ObjectId, ref: 'User' },
  // 删除标记
  destroyedAt: { type: 'Date' }
})

//
// 使用插件
// -----------------------------------------------------------------------------
AmountSchema.plugin(timestamps)
AmountSchema.plugin(uniqueValidator)


mongoose.model('amount', AmountSchema)

module.exports = mongoose.model('amount')
