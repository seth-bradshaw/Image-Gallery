const express = require('express');
const { saveImageDetails, deleteImage } = require('../controllers/images');
const checkAuthToken = require('../middleware/checkAuthToken');
const router = express.Router();

router.post('/upload', checkAuthToken, saveImageDetails);
router.delete('/remove', checkAuthToken, deleteImage);

module.exports = router;