const authServices = require('./auth.services')
const router = require('express').Router()

router.post('/login', authServices.postLogin)
router.post('/recovery-password', authServices.postRecoveryPassword)
router.patch('/recovery-password/:id', authServices.patchPassword)

module.exports = router