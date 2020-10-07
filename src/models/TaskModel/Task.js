const mongoose = require('mongoose');

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

module.exports = Task