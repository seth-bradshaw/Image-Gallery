const jwt = require('jsonwebtoken')

const decryptToken = (token) => {
    const secret = jwt.verify(token, process.env.JWT_KEY);
    return secret;
}

// TODO need to verify this functions properly
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
                return res.status(401).send(
                    "Authorization token required."
                );
            }

            const secret = decryptToken(credentials)

            if (!secret.user.id) {
                return res.status(401).send('Invalid credentials.');
            }

            const date = new Date();
            const currentTime = date.getTime();

            if (currentTime > secret.expires_at) {
                return res.status(401).send('Access token has expired. Please relogin.');
            }

            res.userId = secret.user.id;
            return next();
        }
    } else {
        // No authorization header, unable access resource
        return next(new Error(
            "Authorization header required."
        ));
    }

}

module.exports = checkAuthToken;