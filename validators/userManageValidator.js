const Joi = require("joi")

const companySchema = Joi.object({
  name: Joi.string().min(2).max(255).required()
})

const userSchema = Joi.object({
  company_id: Joi.number().integer().positive().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional()
})

const profileSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  first_name: Joi.string().min(1).max(100).optional(),
  last_name: Joi.string().min(1).max(100).optional(),
  dob: Joi.date().iso().optional()
})

const addressSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  street: Joi.string().min(3).max(255).optional(),
  city: Joi.string().min(2).max(100).optional(),
  state: Joi.string().min(2).max(100).optional(),
  zip_code: Joi.string().pattern(/^[0-9]{4,10}$/).optional()
})

module.exports = {
  companySchema,
  userSchema,
  profileSchema,
  addressSchema
}