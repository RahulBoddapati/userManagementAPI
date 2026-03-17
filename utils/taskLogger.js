const logStream = require("./taskWriteLogToFile")

function logAction(message, callback) {

  console.log("LOG:", message)

  logStream.write(message + "\n")

  if (callback) {
    callback()
  }
}

module.exports = logAction