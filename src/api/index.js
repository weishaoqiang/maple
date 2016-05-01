const express = require('express')
const router = express.Router()
const user = require('../controller/user')

//用户相关api
router.post('/signup', user.signup)
router.post('/signin', user.signin)

module.exports = router;
