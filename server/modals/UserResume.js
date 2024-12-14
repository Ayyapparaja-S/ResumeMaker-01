const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: 'String',
        required: [true, 'Email is Required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid Email']
    },
    password: {
        type: 'String',
        required: [true, 'Password is Required'],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: 'String',
        select: false,
        required: [true, 'Confirm Password is Required'],
        validate: {
            // this only works when Create and Save documents
            validator: function (el){
                return el === this.password
            },
            message: 'Passwords are not the same'
        }
    }
})

userSchema.pre('save',async function(next) {
    //only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    this.password =await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

userSchema.pre(/^find/, async function(next){
    this.find({active: {$ne: false}})
})

userSchema.methods.correctPassword = async(candidatePassword, userPassword) => {
       return await bcrypt.compare(candidatePassword, userPassword)
}

let User = new mongoose.model('UserResume', userSchema)

// User (first parameter) - it is the collection/table name in db in plural lowercase form (eg: users)

module.exports = User