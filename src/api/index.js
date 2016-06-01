const express = require('express')
const router = express.Router()
const user = require('../controller/user')
const notification = require('../controller/notification')
const repair = require('../controller/repair')
const amount = require('../controller/amount')
const check = require('../controller/check')

//用户相关api
router.post('/signup', user.signup)
router.post('/signin', user.signin)
router.get('/signout', user.signout)
router.post('/get_email_code', user.getEmailCode)
router.post('/update_password', user.updatePassword)
router.post('/delete_user', user.deleteUser)
router.post('/modify_user', user.modifyUser)
router.post('/read_user', user.readUser)
router.post('/delete_user', user.deleteUser)
router.post('/get_user_list', user.getUserList)
router.post('/find_user', user.findUser)
router.post('/delete_user', user.deleteUser)
router.get('/user/getDetail', user.getDetail)

// 通知类相关
router.post('/notification', notification.createNotification) // 创建通知
router.get('/notification', notification.readNotification)
router.get('/repair', repair.getRepair) // 获取报修
router.get('/complaint', repair.getComplaint)
router.put('/complaint', repair.handComplaint)


// 资金类相关
router.get('/check', check.index)
module.exports = router;
