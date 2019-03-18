const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticate(req, res ,next) {
    try {
        var decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        req.decoded = decoded
        next()
        
    } catch (error) {
        res.status(401).json({msg: 'unauthorized'})
    }
}

module.exports = authenticate