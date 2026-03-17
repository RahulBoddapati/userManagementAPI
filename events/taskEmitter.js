const EventEmitter = require("events")

const taskEmitter = new EventEmitter()

taskEmitter.on("taskCreated", (task) => {
  console.log("Task created:", task.title)
})

taskEmitter.on("taskDeleted", (id) => {
  console.log("Task deleted:", id)
})

module.exports = taskEmitter