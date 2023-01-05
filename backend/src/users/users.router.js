const usersServices = require('./users.services')
const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.route('/')
    .get(authMiddleware.authenticate('jwt', { session: false }), roleMiddleware, usersServices.getAllUsers)
    .post(usersServices.postUser)

router.route('/me')
    .get(authMiddleware.authenticate('jwt', { session: false }), usersServices.getMyUser)
    .patch(authMiddleware.authenticate('jwt', { session: false }), usersServices.patchMyUser)
    .delete(authMiddleware.authenticate('jwt', { session: false }), usersServices.deleteMyUser)

router.route('/:id')
    .get(authMiddleware.authenticate('jwt', { session: false }), roleMiddleware, usersServices.getUserById)
    .patch(authMiddleware.authenticate('jwt', { session: false }), roleMiddleware, usersServices.patchUser)
    .delete(authMiddleware.authenticate('jwt', { session: false }), roleMiddleware, usersServices.deleteUser)

module.exports = router