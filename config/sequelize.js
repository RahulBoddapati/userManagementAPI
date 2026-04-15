const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("taskdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
})

module.exports = sequelize