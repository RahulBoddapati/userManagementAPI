const fs = require("fs")

const logStream = fs.createWriteStream("tasklog.txt", {
  flags: "a"
})

module.exports = logStream