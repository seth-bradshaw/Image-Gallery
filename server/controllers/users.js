const runClientWith = require('../mongo/client');
const { encrypt } = require('./encryptionHelpers');

const validateRequestBody = (body) => (Boolean(body.username) && body.username.length > 3) && (Boolean(body.password) && body.password.length > 5)

// TODO endpoint to validate username doesn't exist already


const createUser = async (req, res, next) => {
    const user = req.body;

    if (validateRequestBody(user)) {
        const createUserHandler = async (client) => {
            const db = client.db('gallery');
            const coll = db.collection("user");

            try {
                const password = encrypt(user.password)
                const result = await coll.insertOne({ ...user, password });

                if (result.insertedId) {
                    res.user = { username: user.username, id: result.insertedId };
                    res.message = 'Successfully created user.'
                    next();
                } else {
                    res.status(400).send({error: { message: 'Failed to create user. Please try again.'}});
                }
            } catch (error) {
                res.status(400).send({ error: {...error, message: 'Failed to create user. Ensure your sending a valid password.'}})
            }
            

        }
        await runClientWith(createUserHandler);
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