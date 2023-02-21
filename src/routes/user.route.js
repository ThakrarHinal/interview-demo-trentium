const userCtrl = require('../controller/user.controller.js')
const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const upload = require('../helpers/fs.helper.js')

const route = express.Router()

route.post('/user', authMiddleware.validateTokenMiddleware, authMiddleware.isAdmin, upload.single('profile'), userCtrl.insertUser)
  .get('/user/:id', authMiddleware.validateTokenMiddleware, authMiddleware.isAdmin, userCtrl.findUser)
  .put('/user/:id', authMiddleware.validateTokenMiddleware, userCtrl.editUser)
  .delete('/user/:id', authMiddleware.validateTokenMiddleware, authMiddleware.isAdmin, userCtrl.deleteData)

module.exports = route
