const express = require('express')
const router = express.Router()
const user = require('../controller/user')

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

module.exports = router;
