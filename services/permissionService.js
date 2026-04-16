const { RolePermission, Permission, Role } = require("../models")

exports.getPermissionsByRoles = async (roles) => {

  const roleRecords = await Role.findAll({
    where: { name: roles }
  })

  const roleIds = roleRecords.map(r => r.id)

  const rolePermissions = await RolePermission.findAll({
    where: { roleId: roleIds }
  })

  const permissionIds = rolePermissions.map(rp => rp.permissionId)

  const permissions = await Permission.findAll({
    where: { id: permissionIds }
  })

  return permissions.map(p => p.name)
}