const jwt = require('jsonwebtoken')

const signAccessToken = (userTokenData) => {
  try {
    const token = jwt.sign(userTokenData, 'abc', {
      expiresIn: '1d'
    })
    if (!token) {
      return null
    }
    return token
  } catch (error) {
    return error
  }
}

const decodeToken = (token) => {
  try {
    const jwtPayload = jwt.verify(token, 'abc')
    if (!jwtPayload) {
      return null
    }
    return jwtPayload
  } catch (error) {
    return error
  }
}

module.exports = {
  signAccessToken,
  decodeToken
}
