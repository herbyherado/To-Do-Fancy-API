const express = require('express')
const index = express.Router()

index.get('/', (req, res) => {
    res.status(200).json({
        message: 'ok'
    })
})

module.exports = index