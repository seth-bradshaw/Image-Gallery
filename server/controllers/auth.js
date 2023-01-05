const User = require('../models/User');
const { compare } = require('./encryptionHelpers');

const login = async (req, res, next) => {
    const { body } = req;

    User.findOne({ username: body.username }).then(user => {
        if (!user) {
            res.status(401).send('Unable to locate user with given username.')
        }

        if (compare(body.password, user.password)) {
            res.user = { username: body.username, id: user._id }
            next(); // * move on to auth token middleware
        } else {
            res.status(401).send('Invalid password.')
        }
    })
}

module.exports = { login }