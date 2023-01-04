const express = require('express');
const { login, logout } = require('../controllers/auth');
const generateAuthToken = require('../middleware/generateAuthToken');
const router = express.Router();

router.post('/login', login, generateAuthToken);

module.exports = router;