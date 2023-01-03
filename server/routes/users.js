const express = require('express');
const { login } = require('../controllers/auth');
const { createUser, editUser, deleteUser } = require('../controllers/users');
const router = express.Router();

// TODO update these to correct CRUD method
router.get('/create', createUser);
// * login user after successful creation
router.get('/create', login);

router.get('/edit', editUser);
router.get('/delete', deleteUser)

module.exports = router;
