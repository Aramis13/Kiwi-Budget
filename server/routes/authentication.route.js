const express = require('express');
const router = express.Router();
const authentication_controller = require('../controllers/authentication.controller');

router.get('/authenticate', authentication_controller.verifyToken);

module.exports = router;