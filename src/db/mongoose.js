const mongoose = require('mongoose');
const conURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(conURL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).catch((e) => {
    console.log('Problem connecting mongoose to the database...');
})

/**
 * TODO: Create new Model
 */
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        validate(value){ // TODO: Validate Data Before Saving It
            if (value < 0) throw new Error('Age must be a positive number')
        }
    },
    jobs: {
        type: String
    }
})

const Task = mongoose.model('Task', {
    Task: {
        type: String
    }, 
    Completed: {
        type: Boolean
    }
})

/**
 * TODO: Insert data to the database
 */

// const Maria = new User({
//     name: 'Maria Rahmadani',
//     age: 29,
//     jobs: 'Wordpress Specialist'
// })

    const task01 = new Task({
        Task: "Setup Front-end on our base repository",
        Completed: false
    })


/**
 * TODO: Save Data to the database
 */

// Maria.save().then(() => {
//     console.log('Success Saving to the database');
// }).catch((e) => {
//     console.log(e);
// })

    // task01.save().then(() => {
    //     console.log('Success Saving to the database');
    // }).catch((e) => {
    //     console.log(e);
    // })