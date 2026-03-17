const express = require("express")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(express.json())

app.use("/api", taskRoutes)

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("Task API running")
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server has started and is running on port ${PORT}`)
})