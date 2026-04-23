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


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Retrieve a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */
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

//Learn NoSQL(DynamoDB or MongoDB)
//Use s3 Bucket in AWS for File Uploads(Profile Upload)