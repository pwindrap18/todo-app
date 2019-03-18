const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    todoList: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save',function(next){
    let pass =  bcrypt.hashSync(this.password,10)
    this.password = pass
    next()
 })

const User = mongoose.model('User', userSchema)

module.exports = User