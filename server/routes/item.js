const express = require('express')
const item = express.Router()
const {createList, findAll, findById, update, deletion} = require('../controllers/item.controller')

item.post('/', createList)
item.get('/', findAll)
item.get('/:id', findById)
item.delete('/:id', deletion)
item.put('/:id', update)

module.exports = item