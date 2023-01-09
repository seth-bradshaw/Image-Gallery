const jwt = require('jsonwebtoken')

const decryptToken = (token) => {
    const secret = jwt.verify(token, process.env.JWT_KEY);
    return secret;
}

function checkAuthToken(req, res, next) {
    if (req.headers && req.headers.authorization) {
        let token;
        const parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            const [scheme, credentials] = parts;

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }

            if (token === undefined) {
                // access token - missing
                return res.status(401).send({ error: { message: "Authorization token required." } });
            }

            const secret = decryptToken(credentials)

            if (!secret.user._id) {
                return res.status(401).send({ error: { message: 'Invalid credentials.' } });
            }

            const date = new Date();
            const currentTime = date.getTime();

            if (currentTime > secret.expires_at) {
                return res.status(401).send({ error: { message: 'Access token has expired. Please relogin.' } });
            }

            res.userId = secret.user._id;
            return next();
        }
    } else {
        // No authorization header, unable access resource
        return res.status(400).send({ error: { message: "Authorization header required." } } );
    }

}

module.exports = checkAuthToken;