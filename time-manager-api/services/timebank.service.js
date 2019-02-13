'use strict';


const TimebankModel = require('../models/timebank.model'),
  configurationService = require('../services/configuration.service'),
  validationHandler = require('../utils/validationHandler');


exports.findTimebankById = (req, res, next) => {
  return TimebankModel.findOne(req.params.id);
}


exports.findTimebankByMonthAndUserId = (req, res, next) => {
  return TimebankModel.find({
    userId: req.params.userId,
    date: {
      $regex: req.query.date + '$'
    }
  }).sort({
    date: 1
  });
}


exports.createTimebank = (req, res, next) => {
  const body = req.body;
  const userConfiguration = configurationService.findConfigurationByUserId(body.userId);
  const userId = body.userId;
  const dateFix = new Date();

  let Year = dateFix.getFullYear();
  let Month = dateFix.getMonth();
  let Day = dateFix.getDate();

  let stop = false;
  let count = 0;
  let resultDate = '';

  const toDayView = 200;
  while (stop) {
    if (count == toDayView) {
      stop = false;
    }
  }

  return TimebankModel.create(body);
}


exports.updatesTimebank = (req, res, next) => {
  const body = req.body;
  return TimebankModel.findOneAndUpdate(req.params.id, body);
}


exports.validateCreateTimebank = (req, res, next) => {
  req.checkBody('jorney', 'Jorney is required').notEmpty();
  var errors = req.validationErrors();
  validationHandler(errors, res);
  return next();
}


exports.validateUpdateTimebank = (req, res, next) => {
  var errors = req.validationErrors();
  validationHandler(errors, res);
  return next();
}