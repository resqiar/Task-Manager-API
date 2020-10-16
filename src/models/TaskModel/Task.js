const mongoose = require('mongoose');

/**
 * ! TASK MODEL !
 */

const taskSchema = new mongoose.Schema({
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
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task