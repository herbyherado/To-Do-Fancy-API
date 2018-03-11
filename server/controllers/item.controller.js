const item = require('../models/item')

module.exports = {
    createList: (req, res) => {
        item.create({
            title: req.body.title
        }, (err, items) => {
            if (err) {
                res.status(400).json({
                    message: 'unable to create list',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'List created successfuly',
                    items
                })
            }
        })
    },
    findById: (req, res) => {
        item.findOne({_id: req.params.id})
            .populate('todo')    
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'item successfully retrieved',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'unable to retrieve item',
                    err
                })
            })
    },
    findAll: (req, res) => {
        item.find()
            .populate('todo')
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'item successfully retrieved',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'item retrieval unsuccessful',
                    err
                })
            })
    },
    update: (req, res) => {
        item.update({
            _id: req.params.id
        },{
            $set: {
                title: req.body.title,
            }
        },{
            setDefaultsOnInsert: true
        })
        .exec()
        .then(items => {
            res.status(200).json({
                message: "item field has been updated",
                items
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "failed to update item field",
                err
            })
        })
    },
    deletion: (req, res) => {
        item.deleteOne({_id: req.params.id})
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'item successfully deleted',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'unable to delete item'
                })
            })
    }
}