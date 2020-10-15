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
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = Task