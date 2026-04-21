const express = require("express")
const routes = require("./routes/userApiRoutes")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")
const { sequelize } = require("./models")

const app = express()

app.use(express.json())

app.use("/api", routes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("User Management API running")
})

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000")
  })
})