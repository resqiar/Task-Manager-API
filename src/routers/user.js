const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer');


//Import Model
const User = require('../models/UserModel/User')


 //! Create User
 router.post('/user', async (req, res) => {
     // Send Request To User Model
     const user = new User(req.body)

     try {
        // Save to mongo
        await user.save()

        // Automatically generate tokens for new users
        const token = user.generateAuthTokens()

        res.status(201).send({
            user,
            token,
            message: "Successfully saved a new account"
        })
     } catch (e) {
        res.status(400).send({
            error: e.message
        })   
     }
 })

 //! Read user's profile
 router.get('/users/my', auth, async (req, res) => {
    // req.user is from authentication fetch code
    res.send(req.user)
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

//! Update User 
router.patch('/user/my', auth, async (req, res) => {

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
        const user = req.user
        
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

//! Delete User 
router.delete('/user/my', auth, async (req, res) => {
    try {
        // delete all the user's account
        await req.user.remove()

        res.send({
            message: "Success deleting your account"
        })
    } catch (e) {
        res.status(500).send({
            error: e.message
        })
    }
})

// ! Login (
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        // Automatically generate tokens here
        const token = await user.generateAuthTokens()

        res.send({user, token})
    } catch (e) {
        console.log(e);
        res.status(400).send({
            error: e.message
        })
    }
})

// ! Logout
    router.post('/user/logout', auth, async (req, res) => {
        try {
            
            req.user.tokens = req.user.tokens.filter((value) => { //remove current token from database
                return value.token !== req.token
            })
            await req.user.save()

            res.send({
                message: "Successfully logout"
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: e.message
            })
        }
    })

// ! Logout of all devices
    router.post('/user/logoutAll', auth, async (req, res) => {
        try {
            // remove all tokens array
            req.user.tokens = []
            await req.user.save()
        
            res.send({ message: "success logout from all devices"} )
        } catch (e) {
            
        }
    })

//! Upload Avatar
    const uploadAvatar = multer({ // upload configuration
        dest: 'avatars',
        limits: {
            fileSize: 10485760
        },
        fileFilter(req, file, callback){
            // check if uploaded is image or not - if not then
            if (!file.originalname.match(/\.(img|png|jpeg)$/)) callback(new Error('Invalid Format'))

            // if yes then save it
            callback(undefined, true)
        }
    })

    router.post('/user/my/avatar', uploadAvatar.single('avatar'), async (req, res) => {
        res.status(201).send()        
    })


module.exports = router
