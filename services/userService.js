const { User, Role, UserRole } = require("../models")
const crypto = require("crypto")
const emailService = require("./emailService")

exports.createUser = async (data) => {
  if (!data.password || data.password.length < 6) {
    throw new Error("Password must be at least 6 characters")
  }

  const verificationToken = crypto.randomBytes(32).toString("hex")

  const user = await User.create({
    ...data,
    status: "pending",
    verificationToken
  })

  const staffRole = await Role.findOne({ where: { name: "staff" } })

  await UserRole.create({
    user_id: user.id,
    role_id: staffRole.id
  })

  await emailService.sendEmail(
    user.email,
    "Verify Account",
    `
      <p>Click to verify your account:</p>
      <a href="http://localhost:3000/api/verify?token=${verificationToken}">
        Verify Account
      </a>
    `
  )

  return user
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