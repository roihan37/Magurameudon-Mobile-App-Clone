const express = require('express')
const Controller = require('../controllers/userController')
const router = express.Router()

router.post('/login', Controller.loginUser)


router.post('/register', Controller.registerUser)

module.exports = router