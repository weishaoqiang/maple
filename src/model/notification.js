const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');

const NotificationSchema = new Schema({
  // 推送通知标题
  title: { type: 'String', default: '' },
  // 推送通知信息
  message: { type: 'String', required: true, default: '' },
  // 用户是否已读
  read: { type: 'Boolean', default: false },
  // 推送通知关联 ID
  notifiableId: { type: ObjectId },
  // 推送通知关联 MODEL
  notifiableType: { type: 'String', required: true, enum: ['activity','repair','amount'] },
  // 推送通知关联用户
  uid: { type: ObjectId },
  // 原操作用户 sourceUid
  sourceUid: { type: ObjectId },
  // 删除标记
  destroyedAt: { type: 'Date' }
});

//
// 使用插件
// -----------------------------------------------------------------------------
NotificationSchema.plugin(timestamps);
NotificationSchema.plugin(uniqueValidator);

// 新建通知
// {
//   title: '标题',
//   message: '通知文本',
//   id: '通知相关 ID',
//   type: '通知相关类型'
//   uid: '通知对象(人)',
//   sourceUid: '操作(来源 uid)',
//   operator: '操作人',
// }
NotificationSchema.statics.notify = function(obj, next) {
  var Notification = mongoose.model('Notification');
  var message = obj.message || '';
  var shouldReturnPromise = typeof next !== 'function';

  if (message) {
    var notification = new Notification({
      title: obj.title,
      message: message,
      notifiableId: obj.id,
      notifiableType: obj.type,
      uid: obj.uid,
      sourceUid: obj.sourceUid,
    });
    if (shouldReturnPromise) {
      return notification.save();
    } else {
      notification.save(function(err) {
        if (err) return next(err);
        next();
      });
    }
  } else {
    if (shouldReturnPromise) {
      return Promise.resolve();
    } else {
      next();
    }
  }
};

mongoose.model('Notification', NotificationSchema);

module.exports = mongoose.model('Notification');
