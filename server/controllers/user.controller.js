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
    read: (req, res) => {

    },
    update: (req, res) => {

    },
    deletion: (req, res) => {

    }
}