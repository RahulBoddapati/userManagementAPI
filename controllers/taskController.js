const taskService = require("../services/taskService")

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      user_id: req.user.id
    })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const task = await taskService.updateStatus(
      req.params.id,
      req.body.status
    )

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}