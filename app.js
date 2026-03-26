const express = require("express")
const userApiRoutes = require("./routes/userApiRoutes")

const app = express()

app.use(express.json())

app.use("/api", userApiRoutes)

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("User Management API running")
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server has started and is running on port ${PORT}`)
})