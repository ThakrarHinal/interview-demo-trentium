const userService = require('../services/user.services.js')
const jwtToken = require('../helpers/jwt.helper.js')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
  try {
    const userDetails = req.body
    const user = await userService.findUserByEmail(userDetails)
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'no user exist with particular email' })
    }
    const passwordVarify = await bcrypt.compare(userDetails.password, user.password)
    if (!passwordVarify) {
      return res.status(401).json({ status: 'fail', message: 'unauthorized' })
    }
    const userTokenData = {
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role
    }
    const token = jwtToken.signAccessToken(userTokenData)
    if (!token.success) {
      return res.status(401).json({ status: 'fail', message: 'unauthorized' })
    }
    return res.status(200).json({ status: 'ok', message: 'You are successfully login', data: token })
  } catch (error) {
    return res.status(500).json({ status: 'internal server error', message: error.message })
  }
}

module.exports = {
  login
}
