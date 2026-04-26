const { User, UserRole } = require("../models")
const jwt = require("jsonwebtoken")
const config = require("../config/jwt")

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } })

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials")
  }
  
  if (user.status !== "active") {
    throw new Error("Cannot Login, User Not Verified")
  }

  const userRole = await UserRole.findOne({
    where: { user_id: user.id }
  });

  const token = jwt.sign(
    { userId: user.id },
    config.secret,
    { expiresIn: config.expiresIn }
  )

  return {
    token,
    user: {
      id: user.id,
      role: userRole ? userRole.role_id : null
    }
  }
}

exports.verifyToken = (token) => {
  return jwt.verify(token, config.secret)
}