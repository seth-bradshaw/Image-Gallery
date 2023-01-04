const { client, runClientWith } = require('../mongo/client');
const { compare } = require('./encryptionHelpers');

const login = async (req, res, next) => {
    const { body } = req;
    const authenticateLoginHandler = async () => {
        const db = client.db('gallery');
        const coll = db.collection("user");
        const user = await coll.findOne({ username: body.username })

        if (!user) {
            res.status(401).send('Unable to locate user with given username.')
        }

        if (compare(body.password, user.password)) {
            console.log('user', { user, body })
            next(); // * move on to auth token middleware
        } else {
            console.log('incorrect password')
            res.status(401).send('Invalid password.')
        }
    }
    await runClientWith(authenticateLoginHandler);
}

module.exports = { login }