const { Address } = require("../models")

exports.createAddress = async (data) => {
  return await Address.create(data)
}

exports.getAllAddresses = async () => {
  return await Address.findAll()
}

exports.getAddressById = async (id) => {
  return await Address.findByPk(id)
}

exports.updateAddress = async (id, data) => {
  const address = await Address.findByPk(id)
  if (!address) return null
  return await address.update(data)
}

exports.deleteAddress = async (id) => {
  const address = await Address.findByPk(id)
  if (!address) return false
  await address.destroy()
  return true
}