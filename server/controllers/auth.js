const login = async (req, res) => {

    res.send(res.user + 'logged in')
}

// * stretch - update internal details after image transformation
const logout = async (req, res) => {
    res.send('logged out')
}

module.exports = { login, logout }