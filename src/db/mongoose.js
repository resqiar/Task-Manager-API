const mongoose = require('mongoose');

/**
 * ! Mongoose Section 
 */

const conURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(conURL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).catch((e) => {
    console.log('Problem connecting mongoose to the database...');
})