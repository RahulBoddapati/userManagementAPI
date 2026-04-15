const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define("Profile", {
    user_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.DATE
  }, {
      timestamps: false
  })
}