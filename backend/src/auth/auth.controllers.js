const { findUserByEmail, updateUser} = require('../users/users.controllers')
const { comparePassword, hashPassword } = require('../utils/crypto')
const RecoveryPasswords = require('../models/recoveryPasswords.models')
const uuid = require('uuid')


const verifyCredentialas = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

const recoveryPassword = async (email) => {
    try {
        const user = await findUserByEmail(email)
        const data = await RecoveryPasswords.create({
            id: uuid.v4(),
            userId: user.id
        })
        return data
    } catch (error) {
        return null
    }
}

const changePassword = async (recoveryPasswordId, password) => {
    const recoveryData = await RecoveryPasswords.findOne({
        where: {
            id: recoveryPasswordId,
            used: false
        }
    })
    if (recoveryData) {
        await RecoveryPasswords.update({
            used: true
        }, {
            where: {
                id: recoveryPasswordId
            }
        })
        const updateUserPassword = await updateUser(recoveryData.userId, {
            password: hashPassword(password)
        })
        return updateUserPassword
    } else {
        return null
    }
}

module.exports = {
    verifyCredentialas,
    recoveryPassword,
    changePassword
}