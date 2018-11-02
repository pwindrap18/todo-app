const router = require('express').Router()
const {
    create,
    getTodos,
    deleteTask,
    completeTask,
    updateTask
} = require('../controllers/todo')

router.post('/create', create)

router.get('/todos',getTodos)

router.delete('/delete',deleteTask)

router.patch('/complete/:id',completeTask)

router.put('/update/:id',updateTask)



module.exports = router