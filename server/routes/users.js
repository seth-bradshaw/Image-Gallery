const express = require('express');
const { login } = require('../controllers/auth');
const { createUser, editUser, deleteUser } = require('../controllers/users/users');
const generateAuthToken = require('../middleware/generateAuthToken');
const router = express.Router();

// TODO update these to correct CRUD method
router.post('/create', createUser, generateAuthToken);
// * login user after successful creation

router.put('/edit', editUser);
router.delete('/delete', deleteUser)

module.exports = router;
