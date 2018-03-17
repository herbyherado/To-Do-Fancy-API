const express = require('express')
const users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const FB = require('fb')

module.exports = {
    loginfb: (req, res) => {
        // const fbToken = req.body.fbToken
        console.log(req.headers)

        FB.api('me', {
            fields: ['name', 'id', 'email'],
            access_token: req.headers.token,
            }, (data) => {
                console.log(data)
                users.findOne({})
            }
          );
        // users.findOne({email: req.body.email})
        // .then(dataUser => {
        //     if(dataUser){
        //         const token = jwt.sign({email: dataUser.email, fbToken: fbToken},'secret')
        //         res.status(200).json({
        //             dataUser,
        //             token
        //         })
        //     } else {
        //         const newUser = new User({
        //             username: req.body.username,
        //             email: req.body.email,
        //             facebook_id: fbId
        //         })
        //         newUser.save((err,data) => {
        //             const token = jwt.sign({email:dataUser.email,fbToken: fbToken},'secret')
        //             res.status(200).json({
        //                 token,
        //                 dataUser:data
        //             })
        //         })
        //     }
        // })
    },
    signin: (req, res) => {
        console.log(req.body)
        users.findOne({username: req.body.username, email: req.body.email})
            .then(user => {
                if(bcrypt.compareSync(req.body.password, user.password)){
                   let token = jwt.sign({
                       id: user._id,
                       email: user.email,
                       username: user.username
                   }, 'secret')
                   res.status(200).json({
                       message: 'sign in success',
                       token
                   })
                } else {
                    res.status(404).json({
                        message: 'user not found'
                    })
                }
            })
            .catch(err => {
                res.status(405).send(err)
            })
    },
    logout: (req, res) => {
        res.status(200).json({
            message: 'server is connected'
        })
    }
}