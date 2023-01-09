const User = require('../models/User');
const { compare } = require('./encryptionHelpers');

const login = async (req, res, next) => {
    const { body } = req;

    User.findOne({ username: body.username }).then(user => {
        if (!user) {
            return res.status(401).send({ error: { message: 'Unable to locate user with given username.' } })
        }

        if (compare(body.password, user.password)) {
            res.user = { username: body.username, email: user.email, fname: user.fname, lname: user.lname, _id: user._id }
            next(); // * move on to auth token middleware
        } else {
            return res.status(401).send({ error: { message: 'Invalid password.' } })
        }
    })
}

const authorizeToken = async (req, res) => {
    User.findOne({ _id: res.userId }).then(user => {
        if (!user) {
            return res.status(401).send({ error: { message: 'Unable to authorize token. Please login again.' } })
        }

        return res.status(200).send({ user: { username: user.username, email: user.email, fname: user.fname, lname: user.lname, _id: user._id } })
    })
}

module.exports = { login, authorizeToken }