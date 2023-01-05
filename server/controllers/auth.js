const runClientWith = require('../mongo/client');
const { compare } = require('./encryptionHelpers');

const login = async (req, res, next) => {
    const { body } = req;
    const authenticateLoginHandler = async (client) => {
        const db = client.db('gallery');
        const coll = db.collection("user");
        const user = await coll.findOne({ username: body.username })

        if (!user) {
            res.status(401).send('Unable to locate user with given username.')
        }

        if (compare(body.password, user.password)) {
            res.user = { username: body.username, id: user._id }
            next(); // * move on to auth token middleware
        } else {
            res.status(401).send('Invalid password.')
        }
    }
    await runClientWith(authenticateLoginHandler);
}

module.exports = { login }