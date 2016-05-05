const express = require('express')
const router = express.Router()
const uuid = require('node-uuid');
const user = require('../controller/user')

//用户相关api
router.post('/signup', user.signup)
router.post('/signin', user.signin)
router.post('/get_email_code', user.getEmailCode)
router.get('/signout', user.signout)

module.exports = router;
