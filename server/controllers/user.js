const User = require('../models/user')
const jwt = require('jsonwebtoken')


module.exports = {
    register(req, res) {
        console.log(req.body)
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then((user)=>{
            res.status(200).json({
                user
            })
        })
        .catch((err)=>{
            console.log(err.message)
            res.status(400).json({
                message: err.message
            })
        })
    }
}