const express = require('express');
const router = express.Router();
const record_controller = require('../controllers/record.controller');

router.post('/addRecord', record_controller.AddRecord);

module.exports = router;