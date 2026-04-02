const express = require("express")
const router = express.Router()
const { readLogs } = require('../utils/fileLogger')

const userController = require("../controllers/userController")
const profileController = require("../controllers/profileController")
const addressController = require("../controllers/addressController")
const companyController = require("../controllers/companyController")
const roleController = require('../controllers/roleController')

router.post('/roles', roleController.createRole)
router.post('/assign-role', roleController.assignRole)

router.post("/users", userController.createUser)
router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)
router.put("/users/:id", userController.updateUser)
router.delete("/users/:id", userController.deleteUser)

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

router.post("/companies", companyController.createCompany)
router.get("/companies", companyController.getAllCompanies)
router.get("/companies/:id", companyController.getCompanyById)
router.put("/companies/:id", companyController.updateCompany)
router.delete("/companies/:id", companyController.deleteCompany)

router.get('/logs', (req, res) => {
  const logs = readLogs()
  res.send(logs)
})

module.exports = router