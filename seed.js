const { sequelize, Role, Permission, RolePermission } = require("./models")

async function seed() {
  await sequelize.sync()

  const admin = await Role.create({ name: "admin" })
  const manager = await Role.create({ name: "manager" })
  const staff = await Role.create({ name: "staff" })

  const create = await Permission.create({ name: "create_task" })
  const view = await Permission.create({ name: "view_tasks" })
  const update = await Permission.create({ name: "update_task" })
  const del = await Permission.create({ name: "delete_task" })

  await RolePermission.bulkCreate([
    { roleId: admin.id, permissionId: create.id },
    { roleId: admin.id, permissionId: view.id },
    { roleId: admin.id, permissionId: update.id },
    { roleId: admin.id, permissionId: del.id },

    { roleId: manager.id, permissionId: view.id },
    { roleId: manager.id, permissionId: update.id },
    { roleId: manager.id, permissionId: del.id },

    { roleId: staff.id, permissionId: view.id },
    { roleId: staff.id, permissionId: update.id }
  ])

  console.log("SEED DONE")
}

seed()