const { Role, User, UserRole } = require("../models")

exports.createRole = async (name) => {
  return await Role.create({ name })
}

exports.getAllRoles = async () => {
  return await Role.findAll()
}

exports.assignRole = async (user_id, role_id) => {
  const user = await User.findByPk(user_id)
  const role = await Role.findByPk(role_id)

  if (!user || !role) return null

  await user.addRole(role)
  return { user_id, role_id }
}

exports.getUserRoles = async (userId) => {
  const userRoles = await UserRole.findAll({
    where: { user_id: userId }
  })

  const roleIds = userRoles.map(r => r.role_id)

  const roles = await Role.findAll({
    where: { id: roleIds }
  })

  return roles.map(r => r.name)
}