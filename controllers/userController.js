const userService = require('../services/userService')

exports.getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers()
  res.json(data)
}

exports.getUserById = async (req, res) => {
  const data = await userService.getUserById(req.params.id)
  if (!data) return res.status(404).json({ error: "User not found" })
  res.json(data)
}

exports.createUser = async (req, res) => {
  const data = await userService.createUser(req.body)
  res.status(201).json(data)
}

exports.updateUser = async (req, res) => {
  const data = await userService.updateUser(req.params.id, req.body)
  if (!data) return res.status(404).json({ error: "User not found" })
  res.json(data)
}

exports.deleteUser = async (req, res) => {
  const success = await userService.deleteUser(req.params.id)
  if (!success) return res.status(404).json({ error: "User not found" })
  res.json({ message: "User deleted" })
}