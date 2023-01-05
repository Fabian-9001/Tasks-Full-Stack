const { DataTypes } = require('sequelize')
const database = require('../utils/database')

const Users = database.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    nickname: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Active'
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'Normal'
    }
})

module.exports = Users