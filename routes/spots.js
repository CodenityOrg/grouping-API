const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController');
const middleware = require('../middleware/auth');

router.get('/', spotController.list);
router.get('/byLocation', spotController.getByLocation);
router.post('/', middleware.authentication, spotController.create);

module.exports = router;
