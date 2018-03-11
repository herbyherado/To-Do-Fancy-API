const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bycrypt = require('bcrypt')
const saltRounds = 10


const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String,
    facebook_id: String,
    item: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
})
// hooks for hashing password
userSchema.pre('save', function (next) { 
    var user = this
    // async method
    bycrypt.genSalt(saltRounds, function (err, salt){
        if (err) return next(err)
        bycrypt.hash(userSchema.password, salt, function(err, hash){
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})
// method for comparing password
userSchema.methods.comparePassword = function (inputPassword, next){
    bycrypt.compare(inputPassword, hash, function (err, res){
       if (err) return next(err)
       next(null, res)
    })
}

module.exports= mongoose.model('User', userSchema)