const userService = require('../services/user.services.js')

const insertUser = (req, res) => {
  try {
    const user = req.body
    const file = req.file.filename
    userService.addUser(user, file)
    return res.status(200).json({ status: 'OK', message: 'You are successfully registered' })
  } catch (error) {
    return res.status(500).json({ status: 'internal server error', message: error.message })
  }
}

const findUser = async (req, res) => {
  try {
    const id = req.params
    const user = await userService.getUser(id)
    return res.status(200).json({ status: 'OK', message: 'success', data: user })
  } catch (error) {
    return res.status(500).json({ status: 'internal server error', message: error.message })
  }
}

const editUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = req.body
    const userData = await userService.updateUser(user, id)
    return res.status(200).json({ status: 'OK', message: 'success', data: userData })
  } catch (error) {
    return res.status(500).json({ status: 'internal server error', message: error.message })
  }
}

const deleteData = (req, res) => {
  try {
    const id = req.params.id
    userService.deleteUser(id)
    return res.status(200).json({ status: 'ok', message: 'success' })
  } catch (error) {
    return res.status(500).json({ status: 'internal server error', message: error.message })
  }
}

module.exports = {
  insertUser,
  findUser,
  editUser,
  deleteData
}
