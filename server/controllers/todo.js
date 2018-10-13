const Todo = require('../models/todo')

module.exports = {
    create(req,res) {
        Todo.create({
            name: req.body.name
        })
        .then((user)=>{
            res.send(user)
        })
    }
}