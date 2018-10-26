const router = require('express').Router()
const {
    create,
    getTodos,
    deleteTask,
    completeTask
} = require('../controllers/todo')

router.post('/create', create)

router.get('/todos',getTodos)

router.delete('/delete',deleteTask)

router.patch('/complete/:id',completeTask)

module.exports = router