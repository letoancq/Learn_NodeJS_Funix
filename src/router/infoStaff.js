const express = require('express');
const router = express.Router();

const staffController = require('../controller/staffController');

router.get('/infoStaff', staffController.getInfoStaff);
router.post('/infoStaff/edit', staffController.postEditStaff);
router.get('/reference', staffController.getReference);
router.post('/reference', staffController.postReference);

module.exports = router;
