const db = require("../config/db")
const taskEmitter = require("../events/taskEmitter")

exports.createTask = async (data) => {

  const [result] = await db.execute(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [
      data.title,
      data.description || "",
      data.status || "pending"
    ]
  )

  const task = {
    id: result.insertId,
    title: data.title,
    description: data.description || "",
    status: data.status || "pending"
  }

  taskEmitter.emit("taskCreated", task)

  return task
}

exports.getAllTasks = async () => {

  const [rows] = await db.execute("SELECT * FROM tasks")

  return rows
}

exports.getTaskById = async (id) => {

  const [rows] = await db.execute(
    "SELECT * FROM tasks WHERE id = ?",
    [id]
  )

  return rows[0]
}

exports.updateTask = async (id, data) => {

  const [result] = await db.execute(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [
      data.title,
      data.description,
      data.status,
      id
    ]
  )

  if (result.affectedRows === 0) return null

  return {
    id,
    title: data.title,
    description: data.description,
    status: data.status
  }
}

exports.deleteTask = async (id) => {

  const [result] = await db.execute(
    "DELETE FROM tasks WHERE id=?",
    [id]
  )

  if (result.affectedRows > 0) {
    taskEmitter.emit("taskDeleted", id)
    return true
  }

  return false
}