const { User } = require("../models")
const crypto = require("crypto")

exports.createUser = async (data) => {
  if (!data.password || data.password.length < 6) {
    throw new Error("Password must be at least 6 characters")
  }

  const token = crypto
    .createHash("sha256")
    .update(data.password)
    .digest("hex")

  return await User.create({
    ...data,
    token
  })
}

exports.getUserByToken = async (token) => {
  return await User.findOne({ where: { token } })
}
exports.getAllUsers = async () => {
  const users = await User.findAll()

  return users.map(u => {
    const { password, token, ...safeUser } = u.toJSON()
    return safeUser
  })
}

exports.getUserById = async (id) => {
  const user = await User.findByPk(id)
  if (!user) return null

  const { password, token, ...safeUser } = user.toJSON()
  return safeUser
}

exports.updateUser = async (id, data) => {
  const user = await User.findByPk(id)
  if (!user) return null
  return await user.update(data)
}

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id)
  if (!user) return false
  await user.destroy()
  return true
}

//g app password: eqwo uqyq xebh vxfq