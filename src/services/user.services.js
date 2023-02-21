const db = require('../db/models')
const hashPassword = require('../helpers/bcrypt.helper.js')

const addUser = (userData, file) => {
  console.log(userData)
  const hashedPassword = hashPassword(userData.password)
  const addData = db.User.create({ firstName: userData.firstName, lastName: userData.lastName, email: userData.email, password: hashedPassword, profile: file, role: userData.role })
  return addData
}

const getUser = (userData) => {
  const user = db.User.findOne({ where: { id: userData.id } })
  return user
}

const findUserByEmail = (userData) => {
  const user = db.User.findOne({ where: { email: userData.email } })
  return user
}

const updateUser = (userData, id) => {
  console.log(userData)
  const userUpdate = db.User.update({ firstName: userData.firstName, lastName: userData.lastName, email: userData.email, password: userData.password, role: userData.role }, { where: { id } })
  console.log(userUpdate)
  return userUpdate
}

const deleteUser = (id) => {
  const remove = db.User.destroy({ where: { id } })
  return remove
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  findUserByEmail
}
