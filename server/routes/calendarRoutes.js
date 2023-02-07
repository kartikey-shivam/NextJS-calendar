const express = require('express');
const eventController = require('./../controller/eventController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post(
  '/create-event',
  authController.isAuthenticated,
  eventController.createEvent
);
router.get(
  '/get-events',
  authController.isAuthenticated,
  eventController.getEvent
);
module.exports = router;
