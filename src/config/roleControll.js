// 权限控制，role对应的角色可以操作，user表示可以对自己进行操作

module.exports = {
  // ·用户相关
  createUser: {
    method: 'post',
    name: '创建用户',
    description: '创建用户',
    role: ['system', 'user']
  },
  deleteUser: {
    method: 'delete',
    name: '删除用户',
    description: '删除用户',
    role: ['system']
  },
  modifyUser: {
    method: 'put',
    name: '修改用户信息',
    description: '修改用户信息',
    role: ['system', 'user']
  },
  readUser: {
    method: 'get',
    name: '查看用户信息',
    description: '查看用户信息',
    role: ['system', 'staff', 'user']
  },
  getUserList: {
    method: 'get',
    name: '用户列表',
    description: '返回用户列表',
    role: ['system', 'staff']
  },
  findUser: {
    method: 'get',
    name: '查找用户',
    description: '根据用户信息查找用户',
    role: ['system', 'staff']
  },

  // 通知类相关，包括小区通知，报修相关通知，投诉建议等
  createNotification: {
    method: 'post',
    name: '添加通知',
    description: '添加通知，包括通知人和被通知人',
    role: ['system', 'staff', 'repairer', 'resident']
  },
  readNotification: {
    method: 'get',
    name: '查看通知',
    description: '查看通知详情或通知列表',
    role: ['system', 'staff', 'repairer', 'resident']
  },
  updateNotification: {
    method: 'put',
    name: '更新通知',
    description: '更新通知为已读或已解决',
    role: ['system', 'staff', 'repairer', 'resident']
  },
  deleteNotification: {
    method: 'delete',
    name: '删除通知',
    description: '删除通知',
    role: ['system', 'staff', 'repairer', 'resident']
  },

  // 住户生活相关
  topUpAmount: {
    method: 'post',
    name: '充值用户金额或增加水电费',
    description: '充值用户金额或增加水电费',
    role: ['system', 'staff']
  },
  deductAmount: {
    method: 'put',
    name: '用户缴费',
    description: '扣除用户金额',
    role: ['system', 'staff']
  },
  readAmount: {
    method: 'get',
    name: '查看剩余金额',
    description: '查看剩余金额',
    role: ['system', 'staff', 'user']
  }
}
