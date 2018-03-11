const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection;
const dbURL = 'mongodb://localhost:27017/todo-fancy';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect(dbURL, err => {
    if(!err)
        console.log('Connected to database');
    else
        console.log('Error Connect to database');
});


const index = require('./routes/index')
const dashboard = require('./routes/dashboard')
const user = require('./routes/user')
const item = require('./routes/item')
// const todo = require('./routes/todo')


app.use('/', index)
app.use('/dashboard', dashboard)
app.use('/user', user)
app.use('/item', item)
// app.use('/todo', todo)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})