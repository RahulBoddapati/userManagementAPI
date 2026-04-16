const { Role, Permission, User } = require("../models")

exports.createPermission = async (req, res) => {
  try {
    const permission = await Permission.create({ name: req.body.name })
    res.json(permission)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.assignPermissionToRole = async (req, res) => {
  const { roleId, permissionId } = req.body

  const role = await Role.findByPk(roleId)
  const permission = await Permission.findByPk(permissionId)

  if (!role || !permission) {
    return res.status(404).json({ error: "Role or Permission not found" })
  }

  await role.addPermission(permission)

  res.json({ message: "Permission assigned to role" })
}

exports.assignRoleToUser = async (req, res) => {
  const { userId, roleId } = req.body

  const user = await User.findByPk(userId)
  const role = await Role.findByPk(roleId)

  console.log("USER:", user?.id)
  console.log("ROLE:", role?.id)

  if (!user || !role) {
    return res.status(404).json({ error: "User or Role not found" })
  }

  await user.addRole(role)

  console.log("ROLE ASSIGNED")

  res.json({ message: "Role assigned" })
}