const express = require('express')
const user = express.Router()
const {create, read, update, deletion} = require('../controllers/user.controller')

user.post('/register', create)
user.get('/', read)
user.put('/update/:id', update)
user.delete('/delete/:id', deletion)

module.exports = user