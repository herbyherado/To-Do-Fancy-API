const todo = require('../models/todo')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId; 
// const item = require('../models/item')

module.exports = {
    create: (req, res) => {
        let token = req.headers.token
        let decode = jwt.verify(token, 'secret')
        todo.create({
            text: req.body.text,
            due_date: req.body.due_date || new Date(Date.now()+864e5),
            user: decode.id
        }, (err, todos) => {
            if (err) {
                res.status(400).json({
                    message: 'unable to create todo item',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'todo item created',
                    todos
                })
            }
        })
    },
    getAll: (req, res) => {
        let token = req.headers.token
        let decode = jwt.verify(token, 'secret')
        todo.find({ user: decode.id })
            .exec()
            .then(todos => {
                res.status(200).json({
                    message: "todo items successfully retrieved",
                    todos,
                    decoded: decode.id
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
    },
    updateStatus: (req, res) => {
        todo.findById(req.params.id)
            .exec()
            .then(data => {
                let newStatus = !data.status
                todo.updateOne({_id:req.params.id},{$set: {status: newStatus}})
                    .exec()
                    .then(newtodo => {
                        res.status(200).send(newtodo)
                    })
                    .catch(error => {
                        console.log('keluar')
                    })
            })
            .catch(err => {
                res.status(401).send(err)
            })

    },
    deleteAll: (req, res) => {
        let token = req.headers.token
        let decode = jwt.verify(token, 'secret')
        todo.deleteMany({user: new ObjectId(decode.id)})
            .then(data => {
                console.log(data)
                res.status(200)
                    .json({
                        message: 'all data deleted',
                        data
                    })
            })
            .catch(err => {
                res.status(400)
                    .json({
                        message: 'unable to delete records',
                        err
                    })
            })
    }
}