const addressService = require('../services/addressService')
const { addressSchema } = require('../validators/userManageValidator')
const { writeLog } = require('../utils/fileLogger')

exports.getAllAddresses = async (req, res) => {
  const data = await addressService.getAllAddresses()
  res.json(data)
}

exports.getAddressById = async (req, res) => {
  const data = await addressService.getAddressById(req.params.id)
  if (!data) return res.status(404).json({ error: "Address not found" })
  res.json(data)
}

exports.createAddress = async (req, res) => {
  const { error } = addressSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const data = await addressService.createAddress(req.body)
  writeLog(`Address created: ${JSON.stringify(data)}`)
  res.status(201).json(data)
}

exports.updateAddress = async (req, res) => {
  const { error } = addressSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const data = await addressService.updateAddress(req.params.id, req.body)
  if (!data) return res.status(404).json({ error: "Address not found" })
  res.json(data)
}

exports.deleteAddress = async (req, res) => {
  const success = await addressService.deleteAddress(req.params.id)
  if (!success) return res.status(404).json({ error: "Address not found" })
  res.json({ message: "Address deleted" })
}