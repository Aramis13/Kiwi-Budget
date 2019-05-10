const express = require('express');
const router = express.Router();
const entry_controller = require('../controllers/entry.controller');

router.post('/addEntry', entry_controller.addEntry);

module.exports = router;