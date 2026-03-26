const db = require('../config/db')

exports.getAllProfiles = async () => {
  const [rows] = await db.execute("SELECT * FROM user_profiles")
  return rows
}

exports.getProfileById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM user_profiles WHERE id=?", [id])
  return rows[0]
}

exports.createProfile = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO user_profiles (user_id, first_name, last_name, dob) VALUES (?, ?, ?, ?)",
    [
      data.user_id,
      data.first_name ?? null,
      data.last_name ?? null,
      data.dob ?? null
    ]
  )

  return { id: result.insertId, ...data }
}

exports.updateProfile = async (id, data) => {
  const [result] = await db.execute(
    "UPDATE user_profiles SET user_id=?, first_name=?, last_name=?, dob=? WHERE id=?",
    [
      data.user_id ?? null,
      data.first_name ?? null,
      data.last_name ?? null,
      data.dob ?? null,
      id
    ]
  )

  if (result.affectedRows === 0) return null
  return { id, ...data }
}

exports.deleteProfile = async (id) => {
  const [result] = await db.execute("DELETE FROM user_profiles WHERE id=?", [id])
  return result.affectedRows > 0
}