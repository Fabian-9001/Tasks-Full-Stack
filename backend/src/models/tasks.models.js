const { DataTypes } = require('sequelize')
const database = require('../utils/database')
const Users = require('./users.models')

const Tasks = database.define('tasks', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING,
        default: 'Pending'
    }
})

module.exports = Tasks