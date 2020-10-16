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

    res.status(201).send(task)
    
    } catch (e) {
        res.status(500).send({
            error: e.message
        })
    }
})



//! Read Tasks
/**
 * Todo: Make a query so user can provides additional properties
 * ? GET /tasks/completed=true
 * ? GET /tasks/limit=10
 * ? GET /tasks/skip=2
 * ? GET /tasks?sortBy=createdAt:asc
 */

router.get('/tasks', auth, async (req, res) => {
    // make a placeholder
    const match = {}
    const sort = {}

    // convert parameter to boolean
    if (req.query.completed) match.Completed = req.query.completed === 'true'

    // if sort exist then
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')

        // bind to sort {}
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1 // if ascending set to 1 if descending set to -1
    }

   try {
       // populate data with query's criteria
       await req.user.populate('tasks').execPopulate({
           path: 'tasks',
           match, // match what query provides here
           options: { // provides data limit and skip that user provided
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
       })

       res.send(req.user.tasks)
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