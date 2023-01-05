const taskControllers = require('./task.controllers')

const getAllTasks = (req, res) => {
    const userId = req.user.id
    taskControllers.findAllTasks(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getTaskById = (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    taskControllers.findTaskById(id, userId)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(400).json({ message: 'Task not found || Permissions denied' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const postTask = (req, res) => {
    const { title, description, status } = req.body
    const userId = req.user.id
    taskControllers.createTask({ userId, title, description, status })
        .then(data => {
            res.status(200).json({ message: 'Task created', data })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const patchTask = (req, res) => {
    const { title, description, status } = req.body
    const id = req.params.id
    const userId = req.user.id
    taskControllers.updateTask(id, userId, { title, description, status })
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Task updated' })
            } else {
                res.status(400).json({ message: 'Task not found || Permissions denied' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const deleteTask = (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    taskControllers.deleteTask(id, userId)
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Task deleted' })
            } else {
                res.status(400).json({ message: 'Task not found || Permissions denied' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllTasks,
    getTaskById,
    postTask,
    patchTask,
    deleteTask
}