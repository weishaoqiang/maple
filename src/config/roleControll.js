// 权限控制，role对应的角色可以操作，user表示可以对自己进行操作

module.exports = {
  // ·用户相关
  createUser: {
    method: 'createUser',
    name: '创建用户',
    description: '创建用户',
    role: ['system', 'user']
  },
  deleteUser: {
    method: 'deleteUser',
    name: '删除用户',
    description: '删除用户',
    role: ['system']
  },
  modifyUser: {
    method: 'modifyUser',
    name: '修改用户信息',
    description: '修改用户信息',
    role: ['system', 'user']
  },
  readUser: {
    method: 'readUser',
    name: '查看用户信息',
    description: '查看用户信息',
    role: ['system', 'staff', 'user']
  },
  getUserList: {
    method: 'getUserList',
    name: '用户列表',
    description: '返回用户列表',
    role: ['system', 'staff']
  },
  findUser: {
    method: 'findUser',
    name: '查找用户',
    description: '根据用户信息查找用户',
    role: ['system', 'staff']
  },

  // 通知类相关，包括小区通知，报修相关通知，投诉建议等
  createNotification: {
    method: 'createNotification',
    name: '添加通知',
    description: '添加通知，包括通知人和被通知人',
    role: ['system', 'staff', 'repairer', 'resident']
  },
  readNotification: {
    method: 'readNotification',
    name: '查看通知',
    description: '查看通知详情或通知列表',
    role: ['system', 'staff', 'repairer', 'resident']
  },
  updateNotification: {
    method: 'updateNotification',
    name: '更新通知',
    description: '更新通知为已读或已解决',
    role: ['system', 'staff', 'repairer', 'resident']
  },
  deleteNotification: {
    method: 'deleteNotification',
    name: '删除通知',
    description: '删除通知',
    role: ['system', 'user']
  },

  // 住户生活相关
  topUpAmount: {
    method: 'topUpAmount',
    name: '充值用户金额',
    description: '充值用户金额',
    role: ['system', 'staff', 'resident']
  },
  deductAmount: {
    method: 'deductAmount',
    name: '用户缴费',
    description: '扣除用户金额',
    role: ['system', 'staff']
  },
  readAmount: {
    method: 'readAmount',
    name: '查看剩余金额',
    description: '查看剩余金额',
    role: ['system', 'staff', 'user']
  }
}
