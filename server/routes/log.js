const express = require('express')
const log = express.Router()
const {signin, loginfb, logout} = require('../controllers/login.controller')

log.post('/signin', signin)
log.post('/fb', loginfb)
log.post('/out', logout)

module.exports = log