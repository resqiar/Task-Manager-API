const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

/**
 * ! USER SCHEMA !
 */

const userSchema = new mongoose.Schema({
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
        type: String,
        default: "Jobless"
    }
})

/**
 * ! Schema Middleware !
 */
userSchema.pre('save', async function(next) {
    // Check if password is created and hash it
    if (this.isModified('password')) this.password = await bcryptjs.hash(this.password, 8)

    // next
    next()
})


/**
 * ! USER MODEL !
 */
const user = mongoose.model('User' ,userSchema)

module.exports = user