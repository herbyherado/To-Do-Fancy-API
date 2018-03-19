const express = require('express')
const todo = express.Router()
const {create, getAll, findById, update, deletion, updateStatus, deleteAll} = require('../controllers/todo.controller')

todo.post('/getAll', getAll)
todo.post('/', create)
todo.put('/status/:id', updateStatus)
todo.delete('/:id', deletion)
todo.post('/all', deleteAll)

todo.get('/:id', findById)
todo.put('/:id', update)

module.exports = todo