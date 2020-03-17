const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController');

router.get('/', spotController.list);
router.post('/', spotController.create);
router.put('/:id/counter', spotController.updateSpotCounter)

module.exports = router;
