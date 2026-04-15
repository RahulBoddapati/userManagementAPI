const { Company } = require("../models")

exports.createCompany = async (data) => {
  return await Company.create(data)
}

exports.getAllCompanies = async () => {
  return await Company.findAll()
}

exports.getCompanyById = async (id) => {
  return await Company.findByPk(id)
}

exports.updateCompany = async (id, data) => {
  const company = await Company.findByPk(id)
  if (!company) return null
  return await company.update(data)
}

exports.deleteCompany = async (id) => {
  const company = await Company.findByPk(id)
  if (!company) return false
  await company.destroy()
  return true
}