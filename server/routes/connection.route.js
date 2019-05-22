const express = require('express');
const router = express.Router();
const connection_controller = require('../controllers/connection.controller');

router.get('/getConnections', connection_controller.GetConnections);
router.post('/addConnection', connection_controller.AddConnection);
router.post('/removeConnection', connection_controller.RemoveConnection);

module.exports = router;