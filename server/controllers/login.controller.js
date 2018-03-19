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
                        console.log(user)
                        if (user){
                            let token = jwt.sign({email: data.email, token: req.headers.token},'secret')
                            res.status(200).json({
                                user,
                                token
                            })
                        } else {
                            console.log('----------', user)
                            users.create({
                                email: user.email,
                                facebook_id: user.id
                            })
                            .then(newUser => {
                                let token = jwt.sign({email: data.email, token: req.headers.token},'secret')
                                res.status(200).json({
                                    data,
                                    newUser,
                                    token
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
        console.log(req.body)
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
        console.log('masuk sini')
        console.log(req.headers.token)
        if(req.headers.token !== 'null'){
            let token = req.headers.token
            let decode = jwt.verify(token,'secret')
            console.log(decode)
            // next()
            res.status(200).json({
                message: 'User verfied',
                data: decode
            })
        } else {
            // next('error')
            res.status(400).json({
                message: 'invalid token'
            })
        }
    }
}
