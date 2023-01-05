const Users = require('../models/users.models')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')

const findAllUsers = async () => {
    const data = await Users.findAll()
    return data
}

const findUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id: id
        }
    })
    return data
}

const creteUser = async (obj) => {
    const data = await Users.create({
        id: uuid.v4(),
        name: obj.name,
        last_name: obj.lastName,
        nickname: obj.nickname,
        email: obj.email,
        password: hashPassword(obj.password),
        gender: obj.gender,
        birthday: obj.birthday
    })
    return data
}

const updateUser = async (id, obj) => {
    const data = await Users.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteUser = async (id) => {
    const data = await Users.update({
        status: 'Inactive'
    }, {
        where: {
            id: id
        }
    })
    return data[0]
}

const findUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByEmail,
    creteUser,
    updateUser,
    deleteUser
}