const jwt = require('jsonwebtoken');

const generateAuthToken = async (req, res) => {
    const date = new Date();
    const created_at = date.getTime();
    const dataToEncrypt = {
        user: res.user,
        created_at,
        expires_at: created_at + (60000 * 60) // * 1 hour
    }

    const auth_token = jwt.sign(dataToEncrypt, process.env.JWT_KEY)

    res.status(200).send({ auth_token })
}

module.exports = generateAuthToken;