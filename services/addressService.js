const db = require('../config/db')

exports.getAllAddresses = async () => {
  const [rows] = await db.execute("SELECT * FROM user_addresses")
  return rows
}

exports.getAddressById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM user_addresses WHERE id=?", [id])
  return rows[0]
}

exports.createAddress = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO user_addresses (user_id, street, city, state, zip_code) VALUES (?, ?, ?, ?, ?)",
    [
      data.user_id,
      data.street ?? null,
      data.city ?? null,
      data.state ?? null,
      data.zip_code ?? null
    ]
  )

  return { id: result.insertId, ...data }
}

exports.updateAddress = async (id, data) => {
  const [result] = await db.execute(
    "UPDATE user_addresses SET user_id=?, street=?, city=?, state=?, zip_code=? WHERE id=?",
    [
      data.user_id ?? null,
      data.street ?? null,
      data.city ?? null,
      data.state ?? null,
      data.zip_code ?? null,
      id
    ]
  )

  if (result.affectedRows === 0) return null
  return { id, ...data }
}

exports.deleteAddress = async (id) => {
  const [result] = await db.execute("DELETE FROM user_addresses WHERE id=?", [id])
  return result.affectedRows > 0
}