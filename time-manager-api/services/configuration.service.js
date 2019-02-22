'use strict';


const ConfigurationModel = require('../models/configuration.model'),
      validationHandler = require('../utils/validationHandler');



exports.findConfigurationByUserId = (req, res, next) => {
  return ConfigurationModel.findOne().where('userId').equals(req.params.userId);
}


exports.createConfiguration = (req, res, next) => {
  const body = req.body;
  return ConfigurationModel.create(body);
}


exports.updateConfiguration = (req, res, next) => {
  const body = req.body;
  return ConfigurationModel.findOneAndUpdate(req.params.id, body);
}


exports.deleteConfiguration = (req, res, next) => {
  return ConfigurationModel.findOneAndDelete(req.params.id);
}


exports.validateCreateConfiguration = (req, res, next) => {
  req.checkBody('journey', 'Journey is required').notEmpty();
  req.checkBody('userId', 'User is required').notEmpty();
  var errors = req.validationErrors();
  validationHandler(errors, res);
  return next();
}


exports.validateUpdateConfiguration = (req, res, next) => {
  req.checkBody('journey', 'Journey is required').notEmpty();
  req.checkBody('userId', 'User is required').notEmpty();
  var errors = req.validationErrors();
  validationHandler(errors, res);
  return next();
}