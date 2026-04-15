const { Task } = require("../models")

exports.createTask = async (data) => {
  return await Task.create(data)
}

exports.getTasks = async () => {
  return await Task.findAll()
}

exports.updateStatus = async (id, status) => {
  const task = await Task.findByPk(id)
  if (!task) return null
  return await task.update({ status })
}

exports.deleteTask = async (id) => {
  const task = await Task.findByPk(id)
  if (!task) return null
  await task.destroy()
  return true
}