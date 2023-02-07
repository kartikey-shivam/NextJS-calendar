const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const EventSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  start: Date,
  end: Date,
  title: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
