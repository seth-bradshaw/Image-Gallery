const jwt = require('jsonwebtoken');

const generateAuthToken = async (req, res) => {
    const date = new Date();
    const currentTime = date.getTime();
    const dataToEncrypt = {
        user: res.user,
        created_at: currentTime,
        expires_at: currentTime + (60000 * 60) // * 1 hour
    }

    const auth_token = jwt.sign(dataToEncrypt, process.env.JWT_KEY)

    res.cookie('auth_token', auth_token)
    res.status(200).send(res.message ?? 'Successfully authenticated user')
}

module.exports = generateAuthToken;