const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const timestamps = require('mongoose-timestamp')
const uniqueValidator = require('mongoose-unique-validator')

const ComplaintSchema = new Schema({
  // 用户id
  sourceUid: { type: ObjectId, required: '请关联用户', ref: 'User' },
  // 标题
  title: { type: 'String' },
  // 投诉内容
  message: { type: 'String' },
  // 是否已经处理
  read: { type: 'Boolean', default: false },
  // 处理的人
  uid: { type: ObjectId, ref: 'User' }
})

//
// 使用插件
// -----------------------------------------------------------------------------
ComplaintSchema.plugin(timestamps)
ComplaintSchema.plugin(uniqueValidator)

mongoose.model('Complaint', ComplaintSchema)

module.exports = mongoose.model('Complaint')
