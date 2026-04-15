const { Role, User } = require("../models")

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

exports.getUserRoles = async (user_id) => {
  const user = await User.findByPk(user_id, { include: Role })
  if (!user) return []
  return user.Roles.map(r => r.name)
}