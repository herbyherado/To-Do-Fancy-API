const express = require('express')

module.exports = {
    login: (req, res) => {
        res.status(200).json({
            message: 'server is connected'
        })
    }
}