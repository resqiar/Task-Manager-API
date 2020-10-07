const mongoose = require('mongoose');
const validator = require('validator');

/**
 * ! USER MODEL !
 */

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)) throw new Error('Email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value.length < 8) throw new Error('Password minimum characters are 8')
            //if (value.toLowercase.includes('password')) throw new Error('You cannot use this password') 
        }
    },
    age: {
        type: String,
        default: 0,
        validate(value){ // TODO: Validate Data Before Saving It
            if (value < 0) throw new Error('Age must be a positive number')
        }
    },
    jobs: {
        type: String
    }
})

module.exports = User