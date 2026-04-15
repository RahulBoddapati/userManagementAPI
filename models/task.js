const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define("Task", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "open"
    }
  }, {
    timestamps: false
  })
}