const express = require('express')
const users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const FB = require('fb')

module.exports = {
    loginfb: (req, res) => {
        FB.api('me', {
            fields: ['name', 'id', 'email'],
            access_token: req.headers.token,
            }, (data) => {
                // console.log('ini hasil data', data)
                users.findOne({email: data.email})
                    .then(user => {
                        // console.log(user)
                        if (user){
                            let token = jwt.sign({email: data.email, fbToken: req.headers.token},'secret')
                            res.status(200).json({
                                user,
                                token
                            })
                        } else {
                            let token = jwt.sign({email: data.email, fbToken: req.headers.token},'secret')
                            res.status(200).json({
                                data,
                                token
                            })
                            // console.log(data)
                            // users.fbUser({
                            //     email: data.email,
                            //     facebook_id: data.id
                            // })
                            // .then(newUser => {
                            //     console.log('dapet cuy')
                            //     console.log(newUser)
                            //     let token = jwt.sign({email: data.email, fbToken: req.headers.token},'secret')
                            //     res.status(200).json({
                            //         newUser,
                            //         token
                            //     })
                            // })
                            // .catch(error => {
                            //     res.status(400).json({
                            //         error
                            //     })
                            // })
                        }
                    })
                    .catch(err => {
                        res.status(400).json({
                            err
                        })
                    })
            }
          );
    },
    signin: (req, res) => {
        console.log(req.body)
        users.findOne({email: req.body.email})
            .then(user => {
                if(bcrypt.compareSync(req.body.password, user.password)){
                   let token = jwt.sign({
                       id: user._id,
                       email: user.email,
                   }, 'secret')
                   console.log('dapet nih', token)
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