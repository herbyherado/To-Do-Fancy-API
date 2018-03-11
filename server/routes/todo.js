const express = require('express')
const todo = express.Router()
const {create, findAll, findById, update, deletion} = require('../controllers/todo.controller')

todo.post('/:itemId', create)
todo.get('/', findAll)
todo.get('/:id', findById)
todo.delete('/:id', deletion)
todo.put('/:id', update)

module.exports = todo