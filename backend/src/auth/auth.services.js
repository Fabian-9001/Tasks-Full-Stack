const authControllers = require('./auth.controllers')
const jsonwebtoken = require('jsonwebtoken')
const { JWTsecret } = require('../../config').api
const mailer = require('../utils/mailer')
const config = require('../../config')

const postLogin = (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        authControllers.verifyCredentialas(email, password)
            .then(data => {
                if (data) {
                    const token = jsonwebtoken.sign({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        role: data.role
                    }, JWTsecret)
                    res.status(200).json({ message: 'Login Successfully', token })
                } else {
                    res.status(400).json({
                        message: 'Invalid Data'
                    })
                }
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: 'Missing Data', fields: {
                email: 'example@example.com',
                password: 'String'
            }
        })
    }
}

const postRecoveryPassword = (req, res) => {
    const { email } = req.body
    authControllers.recoveryPassword(email)
        .then(async data => {
            if (data) {
                await mailer.sendMail({
                    from: `<${config.api.email}>`,
                    to: email,
                    subject: 'Recuperación de Contraseña',
                    html: `<a href='${config.api.host}/api/v1/auth/recovery-password/${data.id}'>Recupera tu contraseña en este enlace</a>`
                })
                res.status(200).json({ message: 'Email Sended' })
            } else {
                res.status(400).json({ message: 'Invalid Data' })
            }
        })
        .catch(() => {
            res.status(400).json({
                message: 'Invalid Data', fields: {
                    email: 'example@exameple.com'
                }
            })
        })
}

const patchPassword = (req, res) => {
    const recoveryPasswordId = req.params.id
    const { password } = req.body
    authControllers.changePassword(recoveryPasswordId, password)
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Updated Password' })
            } else {
                res.status(400).json({ message: 'URL Expired' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}


module.exports = {
    postLogin,
    postRecoveryPassword,
    patchPassword
}