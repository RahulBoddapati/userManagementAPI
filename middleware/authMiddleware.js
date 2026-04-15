const userService = require("../services/userService")
const roleService = require("../services/roleService")

exports.authenticate = async (req, res, next) => {
  const token = req.headers["token"]

  if (!token) {
    return res.status(401).json({ error: "Token required" })
  }

  const user = await userService.getUserByToken(token)

  if (!user) {
    return res.status(401).json({ error: "Invalid token" })
  }

  req.user = user
  next()
}

exports.authorize = (allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const roles = await roleService.getUserRoles(req.user.id)

    const hasAccess = roles.some(r => allowedRoles.includes(r))

    if (!hasAccess) {
      return res.status(403).json({ error: "Forbidden" })
    }

    next()
  }
}

//Add Token Authentication and Introduce password retriction for token

//Generate token based on password, the same token is used for all usage of a user
// as you should extract the token and get the user_id from it

//Setup EmailService
//Use the Service for reset password and new password emails

//Integrate TaskManagement with UserManagement based on the User role
// (Ex: Admin can assign a task, others can add comments, change status, and close the task) similar to a pull request