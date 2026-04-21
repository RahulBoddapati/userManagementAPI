const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const RolePermission = sequelize.define("RolePermission", {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    permissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    timestamps: true
  })

  RolePermission.removeAttribute('id') // 🔥 REQUIRED

  return RolePermission
}