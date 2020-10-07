const mongoose = require('mongoose');
const validator = require('validator');
const conURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(conURL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).catch((e) => {
    console.log('Problem connecting mongoose to the database...');
})

/**
 * TODO: Create new Model
 */


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
            if (value.toLowercase.includes('password')) throw new Error('You cannot use this password') 
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


/**
 * ! TASK MODEL !
 */

const Task = mongoose.model('Task', {
    Task: {
        type: String,
        required: true,
        trim: true
    }, 
    Completed: {
        type: Boolean,
        default: false
    }
})

/**
 * TODO: Insert data to the database
 */

        // const newUser = new User({
        //     name: 'Magdalena Strolern',
        //     email: 'Mag23@gmail.com ',
        //     password: 'Shdscbw1982',
        //     jobs: 'Git Specialist'
        // })

    const task01 = new Task({
        Task: "Initialize Repository"
    })


/**
 * TODO: Save Data to the database
 */

        // newUser.save().then(() => {
        //     console.log('Success Saving to the database');
        // }).catch((e) => {
        //     console.log(e);
        // })

    task01.save().then(() => {
        console.log('Success Saving to the database');
    }).catch((e) => {
        console.log(e);
    })