const tokenDecoder = require('../helpers/jwt.helper.js')
const model = require('../db/models')

const validateTokenMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ status: 'fail', message: 'no token provided' })
    }
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(400).json({ status: 'fail', message: 'no token provided' })
    }
    const barearToken = authHeader.split(' ')
    const token = barearToken[1]
    if (!token) {
      return res.status(404).json({ status: 'fail', message: 'invalid token' })
    }
    const tokenData = tokenDecoder.decodeToken(token)
    if (!tokenData) {
      return res.status(440).json({ status: 'fail', message: 'invalid token' })
    }
    const userExist = await model.User.findOne({ where: { id: tokenData.userId } })
    if (!userExist) {
      return res.status(403).json({ status: 'fail', message: 'Access Denied' })
    }
    req.userData = userExist.dataValues
    next()
  } catch (error) {
    return res.status(500).json({ status: 'internal server error', message: error.message })
  }
}

const isAdmin = (req, res, next) => {
  const { userData } = req
  if (userData.role !== 1) {
    return res.status(403).json({ status: 'unAuthorized', message: 'Access Denied' })
  }
  next()
}

const isUser = (req, res, next) => {
  const { userData } = req
  if (userData.role !== 2) {
    return res.status(403).json({ status: 'unAuthorized', message: 'Access Denied' })
  }
  next()
}

module.exports = {
  validateTokenMiddleware,
  isAdmin,
  isUser
}
