const express = require('express');
const { login, authorizeToken } = require('../controllers/auth');
const checkAuthToken = require('../middleware/checkAuthToken');
const generateAuthToken = require('../middleware/generateAuthToken');
const router = express.Router();

router.post('/login', login, generateAuthToken);
router.get('/token_verification', checkAuthToken, authorizeToken);

module.exports = router;