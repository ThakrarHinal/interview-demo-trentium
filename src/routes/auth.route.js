const userCtrl = require('../controller/auth.controller.js')
const express = require('express')

const route = express.Router()

route.post('/login', userCtrl.login)

module.exports = route
