const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define("UserRole", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: "user_roles",
    timestamps: true
  })
}