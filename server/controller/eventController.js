const catchAsync = require('../utils/catchAsync');
// const createSendToken = require('../utils/jwtToken');
const moment = require('moment');
const Event = require('./../model/eventModel');
exports.createEvent = catchAsync(async (req, res, next) => {
  console.log(req.body, 'body');
  const event = await Event.create(req.body);
  console.log(event, 'event');
  res.status(201).json({
    success: true,
    event,
  });
});
exports.getEvent = catchAsync(async (req, res, next) => {
  const events = await Event.find(
    { $gte: moment(req.query.start).toDate() },
    { $lte: moment(req.query.end).toDate() }
  );
  res.send(events);
});
