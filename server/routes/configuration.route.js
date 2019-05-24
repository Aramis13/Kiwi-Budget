const express = require('express');
const router = express.Router();
const configuration_controller = require('../controllers/configuration.controller');

router.get('/getTheme', configuration_controller.GetTheme);
router.post('/changeTheme', configuration_controller.ChangeTheme);

module.exports = router;