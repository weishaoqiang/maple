const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');

const DetailSchema = new Schema({
  // 用户id
  uid: { type: ObjectId, required: '请关联用户' },
  // 用户真实名称
  name: { type: 'String' },
  // 身份证
  identityCard: { type: 'String' },
  // 居住地址
  address: { type: 'String' },
  // 是否已经认证
  read: { type: 'Boolean' },
  // 认证的人
  readUid: { type: 'Number' },
});

//
// 使用插件
// -----------------------------------------------------------------------------
DetailSchema.plugin(timestamps);
DetailSchema.plugin(uniqueValidator);

mongoose.model('Detail', DetailSchema);

module.exports = mongoose.model('Detail');
