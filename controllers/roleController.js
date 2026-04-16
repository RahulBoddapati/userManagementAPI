const roleService = require('../services/roleService')
const { UserRole } = require("../models")

exports.createRole = async (req, res) => {
  const data = await roleService.createRole(req.body.name)
  res.status(201).json(data)
}

exports.assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body

    const record = await UserRole.create({
      user_id: userId,
      role_id: roleId
    })

    res.json({
      message: "Role assigned",
      data: record
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}