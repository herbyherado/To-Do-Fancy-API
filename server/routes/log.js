const express = require('express')
const log = express.Router()
const {signin, loginfb, logout, verify} = require('../controllers/login.controller')

log.post('/signin', signin)
log.post('/fb', loginfb)
log.get('/out', logout)
log.post('/verify', verify)

module.exports = log