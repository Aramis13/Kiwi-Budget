const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

router.post('/login', user_controller.Login);
router.post('/createUser', user_controller.CreateUser);
router.get('/getUserName', user_controller.GetUserNameFromClient);

module.exports = router;