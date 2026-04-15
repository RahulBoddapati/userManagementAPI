const { Profile } = require("../models")

exports.createProfile = async (data) => {
  return await Profile.create(data)
}

exports.getAllProfiles = async () => {
  return await Profile.findAll()
}

exports.getProfileById = async (id) => {
  return await Profile.findByPk(id)
}

exports.updateProfile = async (id, data) => {
  const profile = await Profile.findByPk(id)
  if (!profile) return null
  return await profile.update(data)
}

exports.deleteProfile = async (id) => {
  const profile = await Profile.findByPk(id)
  if (!profile) return false
  await profile.destroy()
  return true
}