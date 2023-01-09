const express = require('express');
const { saveImageDetails, deleteImage, fetchUserImages, fetchPublicImages } = require('../controllers/images/images');
const checkAuthToken = require('../middleware/checkAuthToken');

const router = express.Router();

router.get('/user', checkAuthToken, fetchUserImages);
router.get('/public', fetchPublicImages);
router.post('/upload', checkAuthToken, saveImageDetails);
router.delete('/remove', checkAuthToken, deleteImage);

module.exports = router;