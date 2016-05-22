const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');

const RepairSchema = new Schema({
  // 报修标题
  title: { type: 'String', default: '' },
  // 推报修主要内容
  message: { type: 'String', required: true, default: '' },
  // 维修员是否已经开始处理
  read: { type: 'Boolean', default: false },
  // 修理员是否已解决
  finish: { type: 'Boolean', default: false },
  // 接手处理的维修员
  uid: { type: ObjectId },
  // 报修的用户 sourceUid
  sourceUid: { type: ObjectId },
  // 删除标记
  destroyedAt: { type: 'Date' }
});

//
// 使用插件
// -----------------------------------------------------------------------------
RepairSchema.plugin(timestamps);
RepairSchema.plugin(uniqueValidator);

mongoose.model('Repair', RepairSchema);

module.exports = mongoose.model('Repair');
