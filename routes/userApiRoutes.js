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
const authController = require("../controllers/authController")
const adminController = require("../controllers/adminController")

router.post(
  "/tasks",
  authenticate,
  authorize("create_task"),
  taskController.createTask
)

router.get(
  "/tasks",
  authenticate,
  authorize("view_tasks"),
  taskController.getTasks
)

router.put(
  "/tasks/:id/status",
  authenticate,
  authorize("update_task"),
  taskController.updateStatus
)

router.delete(
  "/tasks/:id",
  authenticate,
  authorize("delete_task"),
  taskController.deleteTask
)

router.post('/roles', roleController.createRole)
router.post('/assign-role', roleController.assignRole)

router.post("/users", userController.createUser)
router.get("/verify", userController.verifyUser)
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

router.post("/login", authController.login)

router.post("/permissions", adminController.createPermission)
router.post("/assign-permission", adminController.assignPermissionToRole)
router.post("/assign-role", adminController.assignRoleToUser)

router.post("/reset-password", userController.resetPassword)
router.post("/forgot-password", userController.forgotPassword)

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

//Add Expiry Time in the 2fa email for verification(both in email sent and in backend)
//Send OTP(4 digit or 16 digit) on Reset Email instead of asking user to copy paste in Postman request(expiry time applies to OTP)
//Add Swagger Documentation to this API(This is used for Deployment to keep the testing done visible to the other team members)
//Create a UI for this API(use AI to make it quick)

//Add a reminder to ChromeJob to verify the user after 6-12hrs, include Redis
//Add Unit Testing for one of the api calls
//Add CI/CD

//Learn NoSQL(DynamoDB or MongoDB)
//Use s3 Bucket in AWS for File Uploads(Profile Upload)