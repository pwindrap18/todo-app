const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    todoList: [{type:Schema.Types.ObjectId, ref: 'Todo'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User