const db = require('../config/db')

exports.createRole = async (name) => {
  const [result] = await db.execute(
    "INSERT INTO roles (name) VALUES (?)",
    [name]
  )
  return { id: result.insertId, name }
}

exports.assignRole = async (user_id, role_id) => {
  await db.execute(
    "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
    [user_id, role_id]
  )
  return { user_id, role_id }
}

exports.getUserRoles = async (user_id) => {
  const [rows] = await db.execute(
    `SELECT r.name
     FROM roles r
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ?`,
    [user_id]
  )

  return rows.map(r => r.name)
}