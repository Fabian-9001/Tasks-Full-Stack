const Tasks = require('../models/tasks.models')
const uuid = require('uuid')

const findAllTasks = async (userId) => {
    const data = await Tasks.findAll({
        where: {
            userId: userId
        }
    })
    return data
}

const findTaskById = async (id, userId) => {
    const data = await Tasks.findOne({
        where: {
            id: id,
            userId: userId
        }
    })
    return data
}

const createTask = async (obj) => {
    const data = await Tasks.create({
        id: uuid.v4(),
        userId: obj.userId,
        title: obj.title,
        description: obj.description,
        status: obj.status
    })
    return data
}

const updateTask = async (id, userId, obj) => {
    const data = await Tasks.update(obj, {
        where: {
            id: id,
            userId: userId
        }
    })
    return data[0]
}

const deleteTask = async (id, userId) => {
    const data = await Tasks.destroy({
        where: {
            id: id,
            userId: userId
        }
    })
    return data
}

module.exports = {
    findAllTasks,
    findTaskById,
    createTask,
    updateTask,
    deleteTask
}