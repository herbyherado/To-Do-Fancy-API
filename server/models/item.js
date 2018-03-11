const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    title: String,
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo',
       }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports= mongoose.model('Item', itemSchema)