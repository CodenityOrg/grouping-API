const express = require('express');
const router = express.Router();
const spots = require('./spots');

const middleware = require('../middleware/auth');
const userController = require('../controllers/userController');

router.use('/login', userController.oauthLogin);
router.use(middleware.authentication);
router.use('/spots', spots);

module.exports = router;
