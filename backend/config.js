require('dotenv').config()

module.exports = {
    api: {
        host: process.env.API_HOST,
        port: process.env.API_PORT,
        JWTsecret: process.env.JWT_SECRET,
        email: process.env.EMAIL,
        emailPassword: process.env.EMAIL_PASSWORD
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    }
}