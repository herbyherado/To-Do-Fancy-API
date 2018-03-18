const User = require('../models/user')

module.exports = {
    create: (req, res) => {
        // res.send(req.body)
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }, (err, user) => {
            if (err) {
                console.log(err)
                res.status(400).json({
                    message:"user creation failed, please try again",
                    err: err
                })
            } else {
                res.status(200).json({
                    message: "user successfully created",
                    user
                })
            }
        })
    },
    fbUser: (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            facebook_id: req.body.facebook_id
        }, (err, user) => {
            if (err) {
                console.log(err)
                res.status(400).json({
                    message:"user creation failed, please try again",
                    err: err
                })
            } else {
                res.status(200).json({
                    message: "user successfully created",
                    user
                })
            }
        })
    },
    read: (req, res) => {
        User.find()
            .exec()
            .then(users => {
                res.status(200).json({
                    message: "user information retrieved",
                    users
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: "failed to retrieve data",
                    err
                })
            })
    },
    update: (req, res) => {
        User.update({
                _id: req.params.id
            },{
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password:req.body.password
                }
            },{
                runValidators: true,
                setDefaultsOnInsert: true
            })
            .exec()
            .then(user => {
                res.status(200).json({
                    message: "user fields have been updated",
                    user
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: "failed to update user data",
                    err
                })
            })
    },
    deletion: (req, res) => {
        User.deleteOne({_id: req.params.id})
            .exec()
            .then(user => {
                res.status(200).json({
                    message: "user deleted",
                    user
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