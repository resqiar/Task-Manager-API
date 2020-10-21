const mongoose = require('mongoose');

/**
 * ! Mongoose Section 
 */

// Create config folder and dev.env file, put mongodb connection URL there OR hardcoded here
const conURL = process.env.MONGODB_CON

mongoose.connect(conURL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).catch((e) => {
    console.log('Problem connecting mongoose to the database...');
})