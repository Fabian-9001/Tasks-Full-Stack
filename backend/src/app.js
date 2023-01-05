//Imports and Dependecies
const express = require('express')
const config = require('../config')
const database = require('./utils/database')
const cors = require('cors')
const usersRoutes = require('./users/users.router')
const authRoutes = require('./auth/auth.router')
const taskRoutes = require('./tasks/task.router')
const initModels = require('./models/initModels')

//Initial Configs
const app = express()
app.use(express.json())
app.use(cors())

//Database
database.authenticate()
    .then(() => console.log('This Server is Authenticated'))
    .catch(err => console.log(err))

database.sync()
    .then(() => console.log('This Server is Synced'))
    .catch(err => console.log(err))

initModels()

//Routes
app.get('/', (req, res) => {
    res.status(200).json('Ok!')
})

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/tasks', taskRoutes)

//Server
app.listen(config.api.port, () => {
    console.log(`The Server ${config.api.host} is Active`)
})