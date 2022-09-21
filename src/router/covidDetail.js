const express = require('express');
const router = express.Router();

const covidDetailController = require('../controller/covidDetailController');

router.get('/', covidDetailController.getIndex);
router.post('/temperature', covidDetailController.postTemperature);
router.post('/injection', covidDetailController.postInjection);
router.post('/infect', covidDetailController.postInfect);

module.exports = router;