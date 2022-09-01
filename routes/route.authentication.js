const express = require('express')
const router = express.Router()
const authController = require('../controllers/controller.authentication')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const register = authController.register
const login = authController.login

const authMiddleware = require('../middleware/auth')

//Create Schemas for post validations
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required()
})

//Add validator and controllers to routes
router.post('/register', validator.body(registerSchema), register)
router.post('/login', validator.body(loginSchema), login)



module.exports = router