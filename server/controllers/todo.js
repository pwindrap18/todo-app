const Todo = require('../models/todo')
const mongoose = require('mongoose')

module.exports = {
    create(req, res) {
        Todo.create({
                name: req.body.name,
                description: req.body.description
            })
            .then((user) => {
                res.status(200).json({
                    user
                })
            })
    },

    getTodos(req, res) {
        Todo.find(req.query).sort({createdAt: -1}).then((todos) => {
            res.status(200).json({
                todos
            })
        })
    },

    deleteTask(req,res) {
        console.log(req.body)
        Todo.remove({_id: mongoose.Types.ObjectId(req.body.id)})
        .then(()=>{
            res.status(200).json({
                msg: 'success'
            })
        })
    },

    completeTask(req,res) {
        Todo.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {complete: true})
        .then((task)=>{
            task.complete = true
            return Todo.find({ complete: false })
        })
        .then((tasks)=>{
            res.status(200).json({
                tasks
            })
        })
    },

    updateTask(req, res) {
        console.log(req.body)
        if (!req.body.description){
            req.body.description = ''
        }
        Todo.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)},{
            name: req.body.name,
            description: req.body.description
        })
        .then((task)=>{
            res.send(task)
        })
    }
}