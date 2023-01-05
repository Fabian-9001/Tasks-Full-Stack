const userControllers = require('./users.controllers')
const mailer = require('../utils/mailer')
const config = require('../../config')

const getAllUsers = (req, res) => {
    userControllers.findAllUsers()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    userControllers.findUserById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: `User with id ${id} not found` })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const postUser = (req, res) => {
    const { name, lastName, nickname, email, password, gender, birthday } = req.body
    userControllers.creteUser({ name, lastName, nickname, email, password, gender, birthday })
        .then(async data => {
            await mailer.sendMail({
                from: `<${config.api.email}>`,
                to: data.email,
                subject: `Bienvenido a mi APP de Genshin Impact ${data.name}`,
                html: `<h1>Hola ${data.name}</h1>`
            })
            res.status(201).json({message:'User Created', data})
        })
        .catch(err => {
            res.status(400).json({
                message: err.message, fields: {
                    name: 'String',
                    lastName: 'String',
                    nickname: 'String',
                    email: 'example@example.com',
                    password: 'String',
                    gender: 'String',
                    birthday: 'YYYY/MM/DD'
                }
            })
        })
}

const patchUser = (req, res) => {
    const { name, lastName, nickname, email, gender, birthday } = req.body
    const id = req.params.id
    userControllers.updateUser(id, { name, lastName, nickname, email, gender, birthday })
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'User Updated' })
            } else {
                res.status(404).json({ message: `User with id ${id} not found` })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message, fields: {
                    name: 'String',
                    lastName: 'String',
                    nickname: 'String',
                    email: 'example@example.com',
                    gender: 'String',
                    birthday: 'YYYY/MM/DD'
                }
            })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'User Deleted' })
            } else {
                res.status(404).json({ message: `User with id ${id} not found` })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getMyUser = (req, res) => {
    const id = req.user.id
    userControllers.findUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const patchMyUser = (req, res) => {
    const id = req.user.id
    const { name, lastName, nickname, gender, birthday } = req.body
    userControllers.updateUser(id, { name, lastName, nickname, gender, birthday })
        .then(() => {
            res.status(200).json({ message: 'User Updated' })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message, fields: {
                    name: 'String',
                    lastName: 'String',
                    nickname: 'String',
                    password: 'String',
                    gender: 'String',
                    birthday: 'YYYY/MM/DD'
                }
            })
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    userControllers.deleteUser(id)
        .then(() => {
            res.status(200).json({ message: 'User Deleted' })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser,
    patchUser,
    patchMyUser,
    deleteUser,
    getMyUser,
    patchUser,
    deleteMyUser
}