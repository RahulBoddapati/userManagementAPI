const sequelize = require("../config/sequelize")

const User = require("./user")(sequelize)
const Company = require("./company")(sequelize)
const Profile = require("./profile")(sequelize)
const Address = require("./address")(sequelize)
const Role = require("./role")(sequelize)
const Task = require("./task")(sequelize)
const Permission = require("./permission")(sequelize)
const RolePermission = require("./rolePermission")(sequelize)
const UserRole = require("./userRole")(sequelize)

Company.hasMany(User, { foreignKey: "company_id" })
User.belongsTo(Company, { foreignKey: "company_id" })

User.hasOne(Profile, { foreignKey: "user_id" })
Profile.belongsTo(User, { foreignKey: "user_id" })

User.hasMany(Address, { foreignKey: "user_id" })
Address.belongsTo(User, { foreignKey: "user_id" })

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});

Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});

User.hasMany(Task, { foreignKey: "user_id" })
Task.belongsTo(User, { foreignKey: "user_id" })

Role.belongsToMany(Permission, { through: "RolePermissions" })
Permission.belongsToMany(Role, { through: "RolePermissions" })

module.exports = {
  sequelize,
  User,
  Company,
  Profile,
  Address,
  Role,
  Task,
  UserRole,
  Permission,
  RolePermission
}