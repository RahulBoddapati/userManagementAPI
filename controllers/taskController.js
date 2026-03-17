const taskService = require("../services/taskService")
const taskSchema = require("../validators/taskValidator")
const logAction = require("../utils/taskLogger")

exports.createTask = async (req, res) => {

  const { error } = taskSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const task = await taskService.createTask(req.body)

  logAction("Task created: " + task.title)

  res.json(task)
}

exports.getAllTasks = async (req, res) => {

  const tasks = await taskService.getAllTasks()

  res.json(tasks)
}

exports.getTaskById = async (req, res) => {

  const task = await taskService.getTaskById(req.params.id)

  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }

  res.json(task)
}

exports.updateTask = async (req, res) => {

  const task = await taskService.updateTask(req.params.id, req.body)

  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }

  logAction("Task updated: " + task.title)

  res.json(task)
}

exports.deleteTask = async (req, res) => {

  const deleted = await taskService.deleteTask(req.params.id)

  if (!deleted) {
    return res.status(404).json({ message: "Task not found" })
  }

  logAction("Task deleted: " + req.params.id)

  res.json({ message: "Task deleted" })
}