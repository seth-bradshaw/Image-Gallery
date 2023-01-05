const { encrypt } = require('../encryptionHelpers');
const User = require('../../models/User');

const validateRequestBody = (body) => (Boolean(body.username) && body.username.length > 3) && (Boolean(body.password) && body.password.length > 5)

// TODO endpoint to validate username doesn't exist already


const createUser = async (req, res, next) => {

    if (validateRequestBody(req.body)) {
        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                return res.status(400).send('Failed to create user. Email already exists.')
            } else {
                const password = encrypt(req.body.password);
                const newUser = new User({ ...req.body, password })

                newUser.save()
                    .then((user) => {
                        res.user = user;
                        res.message = { message: 'Successfully created user.', user };
                        next();
                    })
                    .catch((error) => {
                        res.status(400).send({ error, message: 'Failed to create user. Please try again.'})
                    })
            }
        })
    } else {
        res.status(400).send({ error: { message: 'Failed to create user. Invalid request body.'}})
    }

}

// TODO stretch endpoint
const editUser = async (req, res) => {
    res.send('edited user')
}

// TODO stretch endpoint
const deleteUser = async (req, res) => {
    res.send('deleted user')
}

module.exports = { createUser, editUser, deleteUser }