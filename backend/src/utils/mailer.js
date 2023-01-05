const nodemailer = require('nodemailer')
const config = require('../../config')

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.api.email,
        pass: config.api.emailPassword
    }
})

module.exports = transport