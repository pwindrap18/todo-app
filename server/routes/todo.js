const router = require('express').Router()
const {
    create,
    getTodos,
    deleteTask,
    completeTask,
    updateTask
} = require('../controllers/todo')
const  authenticate = require('../middlewares/authentication')

router.post('/create', authenticate, create)

router.get('/todos', authenticate, getTodos)

router.delete('/delete',deleteTask)

router.patch('/complete/:id',completeTask)

router.put('/update/:id',updateTask)



module.exports = router