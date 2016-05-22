const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');

// 缴费记录
const checkSchema = new Schema({
  // 金额
  amount: { type: 'Number', default: 0 },
  // 标题
  title: { type: 'String' },
  // 内容
  message: { type: 'String' },
  // 类型
  type: { type: 'String', enum: ['ALL', 'WATER', 'ENERGY'] },
  // 关联用户
  uid: { type: ObjectId },
  // 删除标记
  destroyedAt: { type: 'Date' }
});

//
// 使用插件
// -----------------------------------------------------------------------------
checkSchema.plugin(timestamps);
checkSchema.plugin(uniqueValidator);


mongoose.model('check', checkSchema);

module.exports = mongoose.model('check');
