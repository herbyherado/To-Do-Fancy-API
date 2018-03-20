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
                users.findOne({email: data.email})
                    .then(user => {
                        if (user){
                            let token = jwt.sign({email: data.email, token: req.headers.token, id: user._id},'secret')
                            res.status(200).json({
                                user,
                                token
                            })
                        } else {
                            users.create({
                                email: data.email,
                                facebook_id: data.id
                            })
                            .then(newUser => {
                                let token = jwt.sign({email: data.email, token: req.headers.token, id: newUser._id },'secret')
                                res.status(200).json({
                                    data,
                                    newUser,
                                    token
                                })
                            })
                            .catch(error => {
                                res.status(400).json({
                                    message: 'failed to create new user',
                                    error
                                })
                            })
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
        users.findOne({email: req.body.email})
            .then(user => {
                if(bcrypt.compareSync(req.body.password, user.password)){
                   let token = jwt.sign({
                       id: user._id,
                       email: user.email,
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
                res.status(404).send(err)
            })
    },
    logout: (req, res) => {
        res.status(200).json({
            message: 'server is connected'
        })
    },
    verify: (req, res) => {
        if(req.headers.token !== 'null'){
            let token = req.headers.token
            let decode = jwt.verify(token,'secret')
            res.status(200).json({
                message: 'User verfied',
                data: decode
            })
        } else {
            res.status(400).json({
                message: 'invalid token'
            })
        }
    }
}
