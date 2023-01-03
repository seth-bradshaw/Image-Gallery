const createUser = async (req, res, next) => {
    res.user = 'created user'
    next()
}

const editUser = async (req, res) => {
    res.send('edited user')
}

const deleteUser = async (req, res) => {
    res.send('deleted user')
}

module.exports = { createUser, editUser, deleteUser }