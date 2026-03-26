const db = require('../config/db')

exports.getAllCompanies = async () => {
  const [rows] = await db.execute("SELECT * FROM companies")
  return rows
}

exports.getCompanyById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM companies WHERE id=?", [id])
  return rows[0]
}

exports.createCompany = async (data) => {
  const [result] = await db.execute(
    "INSERT INTO companies (name) VALUES (?)",
    [data.name]
  )

  return { id: result.insertId, ...data }
}

exports.updateCompany = async (id, data) => {
  const [result] = await db.execute(
    "UPDATE companies SET name=? WHERE id=?",
    [data.name ?? null, id]
  )

  if (result.affectedRows === 0) return null
  return { id, ...data }
}

exports.deleteCompany = async (id) => {
  const [result] = await db.execute("DELETE FROM companies WHERE id=?", [id])
  return result.affectedRows > 0
}