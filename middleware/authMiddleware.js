const jwt = require("jsonwebtoken")
const config = require("../config/jwt")
const roleService = require("../services/roleService")
const permissionService = require("../services/permissionService")

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]

    if (!token) {
      return res.status(401).json({ error: "Token required" })
    }

    const decoded = jwt.verify(token, config.secret)

    req.user = {
      id: decoded.userId
    }

    next()

  } catch (err) {
    return res.status(401).json({ error: "Invalid token" })
  }
}


exports.authorize = (permissionName) => {
  return async (req, res, next) => {
    try {
      const roles = await roleService.getUserRoles(req.user.id)

      if (!roles.length) {
        return res.status(403).json({ error: "Forbidden" })
      }

      const permissions = await permissionService.getPermissionsByRoles(roles)

      if (!permissions.includes(permissionName)) {
        return res.status(403).json({ error: "Forbidden" })
      }

      next()

    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}