const roleService = require('../services/roleService')

exports.createRole = async (req, res) => {
  const data = await roleService.createRole(req.body.name)
  res.status(201).json(data)
}

exports.assignRole = async (req, res) => {
  const { user_id, role_id } = req.body
  const data = await roleService.assignRole(user_id, role_id)
  res.json(data)
}