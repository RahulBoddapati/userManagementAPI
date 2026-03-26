const profileService = require('../services/profileService')
const { profileSchema } = require('../validators/userManageValidator')
const { writeLog } = require('../utils/fileLogger')

exports.getAllProfiles = async (req, res) => {
  const data = await profileService.getAllProfiles()
  res.json(data)
}

exports.getProfileById = async (req, res) => {
  const data = await profileService.getProfileById(req.params.id)
  if (!data) return res.status(404).json({ error: "Profile not found" })
  res.json(data)
}

exports.createProfile = async (req, res) => {
  const { error } = profileSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const data = await profileService.createProfile(req.body)
  writeLog(`Profile created: ${JSON.stringify(data)}`)
  res.status(201).json(data)
}

exports.updateProfile = async (req, res) => {
  const { error } = profileSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  const data = await profileService.updateProfile(req.params.id, req.body)
  if (!data) return res.status(404).json({ error: "Profile not found" })
  res.json(data)
}

exports.deleteProfile = async (req, res) => {
  const success = await profileService.deleteProfile(req.params.id)
  if (!success) return res.status(404).json({ error: "Profile not found" })
  res.json({ message: "Profile deleted" })
}