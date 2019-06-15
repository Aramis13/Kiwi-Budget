const express = require('express');
const router = express.Router();
const record_controller = require('../controllers/record.controller');

router.post('/addRecord', record_controller.AddRecord);
router.post('/deleteRecord', record_controller.DeleteRecord);
router.post('/editRecord', record_controller.EditRecord);
router.get('/getRecords', record_controller.GetRecords);
router.get('/getRecordsMonth', record_controller.GetRecordsMonth);
router.get('/getYearRecords', record_controller.GetYearRecords);

module.exports = router;