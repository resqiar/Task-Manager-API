const express = require('express');
const app = express()
const PORT = process.env.PORT || '3000'

//Import Mongoose Setup
require('./db/mongoose');

/**
 * TODO: Automatically Parse Incoming JSON
 */
app.use(express.json())

/**
 * TODO: ROUTING
 */
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, console.log(`Server Up and Run on port ${PORT}`))