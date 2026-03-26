const fs = require('fs')
const path = require('path')

const logFilePath = path.join(__dirname, '../logs/app.log')

exports.writeLog = (message) => {
  const timestamp = new Date().toISOString()
  const log = `[${timestamp}] ${message}\n`

  fs.appendFile(logFilePath, log, (err) => {
    if (err) console.error("File write error:", err)
  })
}

exports.readLogs = () => {
  try {
    if (!fs.existsSync(logFilePath)) return ""
    return fs.readFileSync(logFilePath, 'utf-8')
  } catch (err) {
    console.error("File read error:", err)
    return ""
  }
}