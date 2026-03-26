const companyService = require('../services/companyService')
const { companySchema } = require('../validators/userManageValidator')
const { writeLog } = require('../utils/fileLogger')

exports.getAllCompanies = async (req, res) => {
  const data = await companyService.getAllCompanies()
  res.json(data)
}

exports.getCompanyById = async (req, res) => {
  const data = await companyService.getCompanyById(req.params.id)
  if (!data) return res.status(404).json({ error: "Company not found" })
  res.json(data)
}

exports.createCompany = async (req, res) => {
  const { error } = companySchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const data = await companyService.createCompany(req.body)
  writeLog(`Company created: ${JSON.stringify(data)}`)
  res.status(201).json(data)
}

exports.updateCompany = async (req, res) => {
  const { error } = companySchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const data = await companyService.updateCompany(req.params.id, req.body)
  if (!data) return res.status(404).json({ error: "Company not found" })
  res.json(data)
}

exports.deleteCompany = async (req, res) => {
  const success = await companyService.deleteCompany(req.params.id)
  if (!success) return res.status(404).json({ error: "Company not found" })
  res.json({ message: "Company deleted" })
}