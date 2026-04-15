const sequelize = require("../config/sequelize")

const User = require("./user")(sequelize)
const Company = require("./company")(sequelize)
const Profile = require("./profile")(sequelize)
const Address = require("./address")(sequelize)
const Role = require("./role")(sequelize)
const Task = require("./task")(sequelize)

Company.hasMany(User, { foreignKey: "company_id" })
User.belongsTo(Company, { foreignKey: "company_id" })

User.hasOne(Profile, { foreignKey: "user_id" })
Profile.belongsTo(User, { foreignKey: "user_id" })

User.hasMany(Address, { foreignKey: "user_id" })
Address.belongsTo(User, { foreignKey: "user_id" })

User.belongsToMany(Role, {
  through: { model: "user_roles", timestamps: false },
  foreignKey: "user_id"
});

Role.belongsToMany(User, {
  through: { model: "user_roles", timestamps: false },
  foreignKey: "role_id"
});

User.hasMany(Task, { foreignKey: "user_id" })
Task.belongsTo(User, { foreignKey: "user_id" })

module.exports = {
  sequelize,
  User,
  Company,
  Profile,
  Address,
  Role,
  Task
}