const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 3000

const dbURL = 'mongodb://localhost:27017/todo-fancy';
const db = mongoose.connection;

const index = require('./routes/index')
const dashboard = require('./routes/dashboard')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/dashboard', dashboard)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})