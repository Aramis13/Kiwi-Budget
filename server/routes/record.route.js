const express = require('express');
const router = express.Router();
const record_controller = require('../controllers/record.controller');

router.post('/addRecord', record_controller.AddRecord);
router.post('/deleteRecord', record_controller.DeleteRecord);
router.get('/getRecords', record_controller.GetRecords);

module.exports = router;