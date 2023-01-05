const taskServices = require('./task.services')
const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')

router.route('/')
    .get(authMiddleware.authenticate('jwt', { session: false }), taskServices.getAllTasks)
    .post(authMiddleware.authenticate('jwt', { session: false }), taskServices.postTask)

router.route('/:id')
    .get(authMiddleware.authenticate('jwt', { session: false }), taskServices.getTaskById)
    .patch(authMiddleware.authenticate('jwt', { session: false }), taskServices.patchTask)
    .delete(authMiddleware.authenticate('jwt', { session: false }), taskServices.deleteTask)

module.exports = router