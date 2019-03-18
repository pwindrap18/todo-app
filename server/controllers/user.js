const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

module.exports = {
    register(req, res) {
        User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            .then((user) => {
                res.status(200).json({
                    user
                })
            })
            .catch((err) => {
                console.log(err.errors)
                res.status(400).json({
                    message: err.errors
                })
            })
    },

    login(req, res) {
        User.findOne({
                email: req.body.email
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        msg: 'wrong email or password'
                    })
                } else {
                    let checkPass = bcrypt.compareSync(req.body.password, user.password)
                    if (checkPass) {
                        jwt.sign({
                            id: user._id
                        }, process.env.JWT_SECRET, function (err, token) {
                            if (err) throw err
                            res.status(200).json(token)
                        })
                    } else {
                        res.status(404).json({
                            msg: 'wrong email or password'
                        })
                    }
                }

            })
    }
}