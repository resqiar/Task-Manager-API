const express = require('express');
const router = express.Router()

//import model
const Task = require('../models/TaskModel/Task')

//! Create Task
router.post('/task', (req, res) => {
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



//! Read Tasks
router.get('/tasks', async (req, res) => {
   
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
router.get('/task/:id', async (req, res) => {
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




//! Update Task by Its ID
router.patch('/task/:id', async (req, res) => {
    // allowed to updates
    const resKey = Object.keys(req.body)
    const allowedToUpdates = ['Task', 'Completed']
    const isValidToUpdate = resKey.every((value) => allowedToUpdates.includes(value))

    if (!isValidToUpdate) return res.status(400).send({ error : "Invalid keys to update!"})

    // task id
    const taskID = req.params.id

   try {
       const task = await Task.findById(taskID)

       if (!task) return res.status(404).send({
           error: "Could not find any data relevant"
       })

       // what user gonna update?
       resKey.forEach((value) => task[value] = req.body[value])
       await task.save()

       res.send({
           message: "Success"
       })
   } catch (e) {
       res.status(500).send({
           error: e.message
       })
   }
})



//! Delete Task by ID
router.delete('/task/:id', async (req, res) => {
   //user ID
   const taskID = req.params.id

   try {
       const task = await Task.findByIdAndDelete(taskID)

       if (!task) return res.status(404).send({
           error: "Could not find any data relevant"
       })
       
       res.send({
           message: "Success"
       })
   } catch (e) {
       res.status(500).send({
           error: e.message
       })
   }
})

module.exports = router