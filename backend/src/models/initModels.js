const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Tasks = require('./tasks.models')

const initModels = () => {

    //Recovery Passwords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //Tasks
    Users.hasMany(Tasks)
    Tasks.belongsTo(Users)
}

module.exports = initModels