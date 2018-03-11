const express = require('express')

module.exports = {
    dashboard: (req, res) => {
        res.status(200).json({
            message: 'server is connected in dashboard'
        })
    }
}