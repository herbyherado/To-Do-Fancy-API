const express = require('express')
const log = express.Router()
const {signin, loginfb, logout, verify} = require('../controllers/login.controller')
const {auth} = require('../helpers/auth')

log.post('/signin', signin)
log.post('/fb', auth, loginfb)
log.get('/out', logout)
log.post('/verify', verify)

module.exports = log