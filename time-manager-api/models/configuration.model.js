'use strict';


const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


const ConfigurationSchema = new Schema({
  name: {
    type: String
  },
  journey: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  days: {
    sunday: {
      type: Boolean,
      default: false
    },
    monday: {
      type: Boolean,
      default: false
    },
    tuesday: {
      type: Boolean,
      default: false
    },
    wednesday: {
      type: Boolean,
      default: false
    },
    thursday: {
      type: Boolean,
      default: false
    },
    friday: {
      type: Boolean,
      default: false
    },
    saturday: {
      type: Boolean,
      default: false
    },
  }
});

const ConfigurationModel = mongoose.model('Configuration', ConfigurationSchema);
module.exports = ConfigurationModel;