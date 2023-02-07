const express = require('express');
const eventController = require('./../controller/eventController');
const router = express.Router();

router.post('/create-event', eventController.createEvent);
router.get('/get-events', eventController.getEvent);
module.exports = router;
