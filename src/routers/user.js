const express = require('express');
const { update } = require('../models/UserModel/User');
const router = express.Router()

//Import Model
const User = require('../models/UserModel/User')


 //! Create User
 router.post('/user', (req, res) => {
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

 //! Read Users
 router.get('/users', (req, res) => {
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
router.get('/user/:id', (req, res) => {
   // id from params
   const userID = req.params.id
   
   //search from the database
   User.findById(userID).then((user) => {
        if (!user) res.status(404).send({
            error: "Could not find any data relevant"
        })

       res.send(user)
   }).catch((e) => {
       res.send({
           message: "Cannot find any data relevant, try again!"
       })
   })
})

//! Update User By its ID
router.patch('/user/:id', async (req, res) => {
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
        const user = await User.findById(userID)
        
        if (!user) {
            return res.status(404).send({
                error: "Could not find any data relevant"
            })
        }

        // what user gonna update?
        resKey.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.status(200).send({
            message: "Success"
        })
    } catch (e) {
        res.send({
            error: e.message
        })
    }
})

//! Delete User by ID
router.delete('/user/:id', async (req, res) => {
    //user ID
    const userID = req.params.id

    try {
        const user = await User.findByIdAndDelete(userID)

        if (!user) return res.status(404).send({
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
