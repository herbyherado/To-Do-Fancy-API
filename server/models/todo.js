const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema ({
    text: String,
    status: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: new Date()
    },
    updated_at: Date,
    due_date: Date
})

todoSchema.pre('update', function (){
    this.updated_at({}, {$set: {updated_at: new Date()}})
})

module.exports = mongoose.model('Todo', todoSchema)