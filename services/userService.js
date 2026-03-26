const db = require('../config/db')

exports.getAllUsers = async () => {
  const [rows] = await db.execute("SELECT * FROM users")
  return rows
}

exports.getUserById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE id=?", [id])
  return rows[0]
}

exports.createUser = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO users (company_id, email, password, phone) VALUES (?, ?, ?, ?)",
    [
      data.company_id ?? null,
      data.email,
      data.password,
      data.phone ?? null
    ]
  )

  return { id: result.insertId, ...data }
}

exports.updateUser = async (id, data) => {
  const [result] = await db.execute(
    "UPDATE users SET company_id=?, email=?, password=?, phone=? WHERE id=?",
    [
      data.company_id ?? null,
      data.email ?? null,
      data.password ?? null,
      data.phone ?? null,
      id
    ]
  )

  if (result.affectedRows === 0) return null
  return { id, ...data }
}

exports.deleteUser = async (id) => {
  const [result] = await db.execute("DELETE FROM users WHERE id=?", [id])
  return result.affectedRows > 0
}