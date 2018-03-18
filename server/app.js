const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const cors = require('cors')

const mongoose = require('mongoose')
const db = mongoose.connection;
const dbURL = 'mongodb://localhost:27017/todo-fancy';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

mongoose.connect(dbURL, err => {
    if(!err)
        console.log('Connected to database');
    else
        console.log('Error Connect to database');
});

const index = require('./routes/index')
const dashboard = require('./routes/dashboard')
const user = require('./routes/user')
const todo = require('./routes/todo')
const log = require('./routes/log')
const {auth} = require('./helpers/auth')


app.use('/', index)
app.use('/dashboard.html', auth, dashboard)
app.use('/user', user)
app.use('/todo', todo)
app.use('/log', log)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})