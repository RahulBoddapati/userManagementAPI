const roleService = require('../services/roleService')

exports.authorize = (allowedRoles) => {
  return async (req, res, next) => {
    const user_id = req.headers['user_id']

    if (!user_id) {
      return res.status(401).json({ error: "User ID required" })
    }

    const roles = await roleService.getUserRoles(user_id)

    const hasAccess = roles.some(role => allowedRoles.includes(role))

    if (!hasAccess) {
      return res.status(403).json({ error: "Forbidden" })
    }

    next()
  }
}