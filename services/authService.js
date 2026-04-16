const { User } = require("../models")
const jwt = require("jsonwebtoken")
const config = require("../config/jwt")

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } })

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials")
  }

  const token = jwt.sign(
    { userId: user.id },
    config.secret,
    { expiresIn: config.expiresIn }
  )

  return token
}

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET)
}