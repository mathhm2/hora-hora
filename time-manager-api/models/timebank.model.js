'use strict';


const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const TimeBankSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  hours: {
    startJourney: {
      type: String
    },
    pauseJourney: {
      type: String
    },
    backJourney: {
      type: String
    },
    endJourney: {
      type: String
    },
  },
  lack: {
    type: Boolean,
    default: false
  },
  workedHours: {
    type: String
  },
  balanceHours: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


const TimeBankModel = mongoose.model('TimeBank', TimeBankSchema);
module.exports = TimeBankModel;