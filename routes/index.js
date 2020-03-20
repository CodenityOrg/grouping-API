const express = require('express');
const router = express.Router();
const spots = require('./spots');

const userController = require('../controllers/userController');

router.use('/login', userController.oauthLogin);
router.use('/spots', spots);

module.exports = router;
