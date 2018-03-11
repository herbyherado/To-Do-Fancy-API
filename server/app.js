const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 3000

const db = mongoose.connection;
const dbURL = 'mongodb://localhost:27017/todo-fancy';

mongoose.connect(dbURL, err => {
    if(!err)
        console.log('Connected to database');
    else
        console.log('Error Connect to database');
});


const index = require('./routes/index')
const dashboard = require('./routes/dashboard')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/dashboard', dashboard)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})