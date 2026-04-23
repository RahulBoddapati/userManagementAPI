const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define("User", {
    company_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending"
    },
    verificationToken: DataTypes.STRING,
    otp: DataTypes.STRING,
    otpExpiry: DataTypes.DATE
  }, {
      timestamps: false
  })
}