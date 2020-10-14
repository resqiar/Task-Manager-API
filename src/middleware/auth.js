const jwt = require('jsonwebtoken');
const User = require('../models/UserModel/User')

const auth = async (req, res, next) => {
    try {
        //authentication code on header
        const authCode = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(authCode, 'resqiar')

        //find user with auth _id and its code
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': authCode })

        if (!user) throw new Error()

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({
            error: "Please Authenticate first!"
        })
    }
}

module.exports = auth