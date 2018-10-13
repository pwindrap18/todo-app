const router = require('express').Router()
const {create} = require('../controllers/todo')

router.post('/',create)

module.exports = router