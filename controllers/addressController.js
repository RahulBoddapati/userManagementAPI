const addressService = require('../services/addressService')

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
  const data = await addressService.createAddress(req.body)
  res.status(201).json(data)
}

exports.updateAddress = async (req, res) => {
  const data = await addressService.updateAddress(req.params.id, req.body)
  if (!data) return res.status(404).json({ error: "Address not found" })
  res.json(data)
}

exports.deleteAddress = async (req, res) => {
  const success = await addressService.deleteAddress(req.params.id)
  if (!success) return res.status(404).json({ error: "Address not found" })
  res.json({ message: "Address deleted" })
}