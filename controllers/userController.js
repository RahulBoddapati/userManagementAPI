const userService = require('../services/userService')
const { userSchema } = require('../validators/userManageValidator')
const { writeLog } = require('../utils/fileLogger')
const emailService = require("../services/emailService")
const crypto = require("crypto")
const { User } = require("../models")

exports.getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers()
  res.json(data)
}

exports.getUserById = async (req, res) => {
  const data = await userService.getUserById(req.params.id)
  if (!data) return res.status(404).json({ error: "User not found" })
  res.json(data)
}

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)

    const safeUser = {
      id: user.id,
      email: user.email,
      phone: user.phone
    }
    res.json(safeUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateUser = async (req, res) => {
  const { error } = userSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const data = await userService.updateUser(req.params.id, req.body)
  if (!data) return res.status(404).json({ error: "User not found" })
  res.json(data)
}

exports.deleteUser = async (req, res) => {
  const success = await userService.deleteUser(req.params.id)
  if (!success) return res.status(404).json({ error: "User not found" })
  res.json({ message: "User deleted" })
}

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body

  const user = await User.findOne({ where: { email } })
  if (!user) return res.status(404).json({ error: "User not found" })

  if (user.otp !== otp || new Date() > user.otpExpiry) {
    return res.status(400).json({ error: "Invalid or expired OTP" })
  }

  await user.update({
    password: newPassword,
    otp: null,
    otpExpiry: null
  })

  res.json({ message: "Password reset successful" })
}

exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "Password too short" })
    }

    const token = crypto
      .createHash("sha256")
      .update(newPassword)
      .digest("hex")

    await req.user.update({
      password: newPassword,
      token
    })

    await emailService.sendEmail(
      req.user.email,
      "Password Changed",
      "Your password was updated."
    )

    res.json({ message: "Password updated" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ where: { email } })

  if (!user) return res.status(404).json({ error: "User not found" })

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiry = new Date(Date.now() + 10 * 60 * 1000)

  await user.update({ otp, otpExpiry: expiry })

  await emailService.sendEmail(
    email,
    "Your OTP",
    `Your OTP is: ${otp} (valid for 10 minutes)`
  )

  res.json({ message: "OTP sent" })
}

exports.verifyUser = async (req, res) => {
  const { token } = req.query

  const user = await User.findOne({
    where: { verificationToken: token }
  })

  if (!user) {
    return res.status(400).json({ error: "Invalid token" })
  }

  await user.update({
    status: "active",
    verificationToken: null
  })

  res.send("Account verified successfully")
}