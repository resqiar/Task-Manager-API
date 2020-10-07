const express = require('express');
const app = express()
const PORT = process.env.PORT || '3000'

//Import Mongoose Setup
const mongoose = require('./db/mongoose');

//Import Model
const User = require('./models/UserModel/User')
const Task = require('./models/TaskModel/Task')

/**
 * TODO: Automatically Parse Incoming JSON
 */
app.use(express.json())

/**
 * TODO: ROUTING
 */

 //! Create User
 app.post('/user', (req, res) => {
     // Send Request To User Model
     const user = new User(req.body)

     // Save to mongo
     user.save().then(() => {
        res.send({
            message: "Successfully saved a new account"
        })
     }).catch((e) => {
         res.send({
             message: e.message
         })
     })
 })

 //! Create Task
 app.post('/task', (req, res) => {
     //send request to Task Model
     const task = new Task(req.body)

     //save it to mongo
     task.save().then(() => {
         res.send({
             message: "Succesfully saved your task"
         })
     }).catch((e) => {
         res.status(400).send({
             message: e.message
         })
     })
 })


app.listen(PORT, console.log(`Server Up and Run on port ${PORT}`))