const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define("Permission", {
    name: { type: DataTypes.STRING, unique: true }
  }, {
    timestamps: false
  })
}