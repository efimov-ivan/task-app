const {Router} = require('express');
const router = Router()
const TaskController = require('../controller/taskController')
const CommentController = require('../controller/commentController')


router.get('/tasks', TaskController.getTasks)
router.post('/task', TaskController.createTask)
router.put('/task/:id/', TaskController.updateTask)
router.delete('/task/:id', TaskController.deleteTask)


router.get('/comments/:id', CommentController.getComments)
router.post('/comment', CommentController.createComment)
router.delete('/comment/:id', CommentController.deleteComment)

module.exports = router