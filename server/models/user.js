const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bycrypt = require('bcrypt')
const saltRounds = 10


const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, 'Please use other email address'],
        required: 'Email address is required',
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    facebook_id: String,
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
})
// hooks for hashing password
userSchema.pre('save', function (next) { 
    let user = this
    // async method
    bycrypt.genSalt(saltRounds, function (err, salt){
        if (err) return next(err)
        bycrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})
userSchema.pre('update', function (next) {
    let user = this
    if (user._update.$set.password){
        bycrypt.genSalt(saltRounds, function (err, salt){
            if (err) return next(err)
            bycrypt.hash(user._update.$set.password, salt, function(err, hash){
                if (err) return next(err)
                user._update.$set.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

module.exports= mongoose.model('User', userSchema)