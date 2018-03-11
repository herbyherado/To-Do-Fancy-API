const todo = require('../models/todo')
const item = require('../models/item')

module.exports = {
    create: (req, res) => {
        todo.create({
            text: req.body.text,
            due_date: req.body.due_date || new Date(Date.now()+864e5)
        }, (err, todos) => {
            if (err) {
                res.status(400).json({
                    message: 'unable to create todo item',
                    err
                })
            } else {
                item.findOne({_id: req.params.itemId})
                    .exec()
                    .then(items => {
                        let newTodo = items.todo
                        newTodo.push(todos._id)
                        item.findByIdAndUpdate(
                            req.params.itemId,
                            {todo: newTodo},
                            {new: true},
                            (err2, todos2) => {
                                if (err2) {
                                    res.status(400).json({
                                        message: 'unable to create todo item',
                                        err
                                    })
                                } else {
                                    res.status(200).json({
                                        message: 'todo item created successfuly',
                                        items
                                    })
                                }
                            }
                        )
                    })
            }
        })
    },
    findAll: (req, res) => {
        todo.find()
            .exec()
            .then(todos => {
                res.status(200).json({
                    message: "todo items successfully retrieved",
                    todos
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: "unable to retrieve todo items",
                    err
                })
            })
    },
    findById: (req, res) => {
        todo.findOne({_id: req.params.id})
            .populate('todo')    
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'todo items successfully retrieved',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'unable to retrieve todo items',
                    err
                })
            })
    },
    update: (req, res) => {
        todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, todos) => {
            if (err) {
                res.status(400).json({
                    message: 'failed to update todo item',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'todo updated',
                    todos
                })
            }
        })
    },
    deletion: (req, res) => {
        todo.deleteOne({_id: req.params.id})
            .exec()
            .then(todos => {
                res.status(200).json({
                    message: "todo item deleted",
                    todos
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: "failed to delete user record",
                    err
                })
            })
    }
}