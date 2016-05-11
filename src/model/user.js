const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');
const util = require('util');
//
// 定义用户Schema结构
// email: '用户登录email',
// username: '用户登录名称',
// name: '用户显示名称',
// password: '用户登录密码',
// role: '用户角色, 分为 [resident, repairer, staff, system]' 默认为residengt
//        其中，resident用户由自己注册，repairer和 staff由 system注册，system系统生成
// -----------------------------------------------------------------------------
const UserSchema = new Schema({
  email: { type: String, required: '邮箱不能为空', unique: '该邮箱已经被使用' },
  username: { type: String, required: '用户名不能为空', unique: '该用户名已经被使用' },
  phone: { type: Number, required: '请输入手机号码', unique: '该手机号已被使用' },
  name: { type: String }, //显示名称
  password: { type: String, required: '密码不能为空' },
  role: { type: String, default: 'residengt' },
  destroy: { type: Boolean, default: false }
});

//
// 使用插件
// -----------------------------------------------------------------------------
UserSchema.plugin(timestamps);
UserSchema.plugin(uniqueValidator);

//
// 验证
// -----------------------------------------------------------------------------
UserSchema.path('email').validate(function (email, cb) {
  cb(validator.isEmail(email));
}, '无效的邮箱');

UserSchema.path('password').validate(function(pass, cb) {
  if (this.passwordConfirmation !== 'undefined') {
    cb(this.passwordConfirmation === pass);
  } else {
    cb()
  }
}, '两次密码输入的不一致');

// 最短密码长度
const MIN_LENGTH_PASSWORD = 8;
UserSchema.path('password').validate(function(pass, cb) {
  cb(MIN_LENGTH_PASSWORD <= pass.length);
}, util.format('密码不能少于 %s 位', MIN_LENGTH_PASSWORD));

// 虚拟数据 验证两次密码是否一致
UserSchema.virtual('passwordConfirmation').get(function (){
  return this._passwordConfirmation;
}).set(function (pass) {
  this._passwordConfirmation = pass;
});


// 更新用户密码
UserSchema.methods.updatePassword = function(currentPassword, password, passwordConfirmation, next) {
  var self = this;

  if (!currentPassword) {
    return next({ message: ' 当前密码不能为空' });
  }

  if (!password) {
    return next({ message: '密码不能为空' });
  }

  if (!passwordConfirmation) {
    return next({ message: '确认密码不能为空' });
  }

  if ( passwordConfirmation !== password ) {
    return next({ message: '两次密码输入不一致' });
  }

  bcrypt.compare(currentPassword, self.password, function(err, res) {
    if (res) {
      self.password = password;
      self.save(function(error) {
        if (error) return next(error);
        next(null, true);
      });
    } else {
      next({ message: '当前密码不正确' });
    }
  });
};

// 找回密码
UserSchema.methods.findPasswordByCode = function(password, passwordConfirmation, next) {
  var self = this;

  if (!password) {
    return next({ status: 1, message: '密码不能为空' });
  }

  if (!passwordConfirmation) {
    return next({ status: 1, message: '确认密码不能为空' });
  }

  if ( passwordConfirmation !== password ) {
    return next({ status: 1, message: '两次密码输入不一致' });
  }

  bcrypt.hash(password, 10, function(err, hash) {
    if (err) return cb(err);
    self.set(password, hash);
    self.update({$set: { password: hash }},function (err) {
      if (err) return next(err);
      next(null, {
        status: 0,
        message: '更新成功'
      });
    })
  });

};

// 创建新用户时, 生成加密密码
UserSchema.pre('save', function(cb) {
  var self = this;
  if (self.isModified('password')) {
    bcrypt.hash(self.password, 10, function(err, hash) {
      if (err) return cb(err);
      self.password = hash;
      cb();
    });
  } else {
    cb();
  }
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
