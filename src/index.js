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

 //! Read Users
 app.get('/users', (req, res) => {
     User.find({}).then((users) => {
         // send back the data to the client
         res.send(users)
     }).catch((e) => {
         res.status(500).send({
             message: e.message
         })
     })
 })

 //! Read single user by its ID
 app.get('/user/:id', (req, res) => {
    // id from params
    const userID = req.params.id
    
    //search from the database
    User.findById(userID).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.send({
            message: "Cannot find any data relevant, try again!"
        })
    })
})

//! Read Tasks
app.get('/tasks', async (req, res) => {
    
    try {
        const tasks = await Task.find({})

        // send to user
        if (!tasks) {
            return res.status(404).send()
        }

        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
})

//! Read Task by its ID
app.get('/tasks/:id', async (req, res) => {
    //task ID
    const taskID = req.params.id

    try {
        const task = await Task.findById(taskID)

        if (!task) {
            return res.status(404).send({
                message: "Could not find any data relevant"
            })
        }

        //! Send Back !
        res.send(task)
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
})


//! Update User By its ID
app.patch('/user/:id', async (req, res) => {
    // user ID 
    const userID = req.params.id

    //! Check if respond keys is valid
    const resKey = Object.keys(req.body)
    const allowedToUpdateField = ['name', 'age', 'jobs']
    const isValidToUpdate = resKey.every((value) => allowedToUpdateField.includes(value))

    // ! If Field is invalid to update !
    if (!isValidToUpdate) {
        return res.status(400).send({
            error: "Invalid Field To Update!"
        })
    }

    try {
        const user = await User.findByIdAndUpdate(userID, req.body, { new: true, runValidators: true})

        if (!user) {
            return res.status(404).send({
                error: "Could not find any data relevant"
            })
        }

        res.status(200).send({
            message: "Succesfully Updated"
        })
    } catch (e) {
        res.send({
            error: e.message
        })
    }
})



app.listen(PORT, console.log(`Server Up and Run on port ${PORT}`))