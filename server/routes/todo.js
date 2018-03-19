const express = require('express')
const todo = express.Router()
const {create, getAll, findById, update, deletion} = require('../controllers/todo.controller')

todo.post('/getAll', getAll)

todo.post('/', create)

todo.get('/:id', findById)
todo.delete('/:id', deletion)
todo.put('/:id', update)

module.exports = todo