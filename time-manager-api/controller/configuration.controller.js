'use strict';


const configurationService = require('../services/configuration.service');


//GET Configuration by USER ID
exports.findConfigurationByUserId = (req, res, next) => {
  return configurationService.findConfigurationByUserId(req, res, next)
    .then((configuration) => {
      return res.json(configuration);
    })
    .catch((err) => {
      res.status(500).send('There was a problem fiding the configuration', err);
    });
}


// CREATE Configuration
exports.createConfiguration = (req, res, next) => {
  return configurationService.createConfiguration(req, res, next)
    .then(() => {
      return res.status(200).send({
        code: 'configuration/create-success',
        message: 'Configuration saved successfully'
      });
    })
    .catch((err) => {
      res.status(500).send('There was a problem adding the information to the database', err);
    });
}


// UPDATE Configuration
exports.updateConfiguration = (req, res, next) => {
  return configurationService.updateConfiguration(req, res, next)
    .then((configuration) => {
      if (!configuration) {
        return res.status(404).send({
          code: 'configuration/update-not-found',
          message: 'Configuration not found'
        });
      }
      return res.status(201).send({
        code: 'configuration/update-success',
        message: 'Configuration update successfully'
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 'configuration/update-error',
        message: 'There was a problem adding the information to the database'
      });
    });
}


// DELETE Configuration
exports.deleteConfiguration = (req, res, next) => {
  return configurationService.deleteConfiguration(req, res, next)
    .then(() => {
      return res.status(200).send({
        code: 'configuration/delete-success',
        message: 'Configuration delete successfully'
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 'condifuration/delete-error',
        message: 'There was a problem adding the information to the database'
      });
    });
}