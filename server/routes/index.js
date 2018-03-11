const express = require('express')
const index = express.Router()
const loginController = require('../controllers/login.controller')

index.get('/', loginController.login)

module.exports = index