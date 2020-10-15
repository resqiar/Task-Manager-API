const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
//import model
const Task = require('../models/TaskModel/Task')

//! Create Task
router.post('/task', auth, async (req, res) => {
    try {
    //create the task
    const task = await Task.create({
        ...req.body,
        Author: req.user._id
    })

    //save it to mongo
    await task.save()

    res.send({ message: "Succesfully saved your task" })
    
    } catch (e) {
        res.status(500).send({
            error: e.message
        })
    }
})



//! Read Tasks
router.get('/tasks', auth, async (req, res) => {
   
   try {
       const tasks = await Task.find({ Author: req.user._id })

       // send to user
       if (!tasks) {
           return res.status(404).send()
       }

       res.send(tasks)
   } catch (e) {
       res.status(500).send({
           message: e.message
       })
   }
})

//! Read Task by its ID
router.get('/task/:id', auth, async (req, res) => {
   //task ID
   const taskID = req.params.id
    
   try {
       const task = await Task.findOne({ _id: taskID, Author: req.user._id })
        
       if (!task) {
           return res.status(404).send()
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
router.patch('/task/:id', auth, async (req, res) => {
    // allowed to updates
    const resKey = Object.keys(req.body)
    const allowedToUpdates = ['Task', 'Completed']
    const isValidToUpdate = resKey.every((value) => allowedToUpdates.includes(value))

    if (!isValidToUpdate) return res.status(400).send({ error : "Invalid keys to update!"})

    // task id
    const taskID = req.params.id

   try {
       const task = await Task.findOne({ _id: taskID, Author: req.user._id })

       if (!task) return res.status(404).send()

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
router.delete('/task/:id', auth, async (req, res) => {
   //user ID
   const taskID = req.params.id

   try {
       const task = await Task.findOneAndDelete({ _id: taskID, Author: req.user._id })

       if (!task) return res.status(404).send()
       
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