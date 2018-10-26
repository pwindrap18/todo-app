
var express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const username = process.env.MLAB_USERNAME
const pass = process.env.MLAB_PASS
mongoose.connect(`mongodb://${username}:${pass}@ds131763.mlab.com:31763/todo`,{useNewUrlParser:true})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todo = require('./routes/todo')

var app = express();
app.use(cors())
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo',todo)


module.exports = app;
