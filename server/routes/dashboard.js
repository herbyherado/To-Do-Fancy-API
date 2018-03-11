const express = require('express')
const dashboard = express.Router()
const dashboardController = require('../controllers/dashboard.controller')

dashboard.get('/', dashboardController.dashboard)

module.exports = dashboard