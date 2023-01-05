const verifyRole = (req, res, next) => {
    const role = req.user.role
    if (role === 'Admin') {
        next()
    } else {
        res.status(400).json({ message: 'Denied Access' })
    }
}

module.exports = verifyRole