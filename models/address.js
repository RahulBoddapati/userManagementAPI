const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define("Address", {
    user_id: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING
  }, {
    timestamps: false
  })
}