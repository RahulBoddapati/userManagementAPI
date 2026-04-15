const express = require("express")
const router = express.Router()
const { readLogs } = require('../utils/fileLogger')
const { authenticate, authorize } = require("../middleware/authMiddleware")

const userController = require("../controllers/userController")
const profileController = require("../controllers/profileController")
const addressController = require("../controllers/addressController")
const companyController = require("../controllers/companyController")
const roleController = require('../controllers/roleController')
const taskController = require("../controllers/taskController")

router.post(
  "/tasks",
  authenticate,
  authorize(["admin", "manager"]),
  taskController.createTask
)

router.get(
  "/tasks",
  authenticate,
  taskController.getTasks
)

router.put(
  "/tasks/:id/status",
  authenticate,
  taskController.updateStatus
)

router.delete(
  "/tasks/:id",
  authenticate,
  taskController.deleteTask
)

router.post('/roles', roleController.createRole)
router.post('/assign-role', roleController.assignRole)

router.post("/users", userController.createUser)
router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)
router.put("/users/:id", userController.updateUser)
router.delete(
  "/users/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
)

router.post("/profiles", profileController.createProfile)
router.get("/profiles", profileController.getAllProfiles)
router.get("/profiles/:id", profileController.getProfileById)
router.put("/profiles/:id", profileController.updateProfile)
router.delete("/profiles/:id", profileController.deleteProfile)

router.post("/addresses", addressController.createAddress)
router.get("/addresses", addressController.getAllAddresses)
router.get("/addresses/:id", addressController.getAddressById)
router.put("/addresses/:id", addressController.updateAddress)
router.delete("/addresses/:id", addressController.deleteAddress)

router.post('/companies', authorize(['admin', 'manager']), companyController.createCompany)
router.get("/companies", companyController.getAllCompanies)
router.get("/companies/:id", companyController.getCompanyById)
router.put("/companies/:id", companyController.updateCompany)
router.delete("/companies/:id", companyController.deleteCompany)

router.post("/reset-password", userController.resetPassword)

router.put(
  "/change-password",
  authenticate,
  userController.changePassword
)

router.get('/logs', (req, res) => {
  const logs = readLogs()
  res.send(logs)
})

module.exports = router