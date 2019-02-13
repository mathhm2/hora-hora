'use strict';


const router = require('express').Router(),
  passport = require('passport'),
  configurationController = require('../controller/configuration.controller'),
  configurationService = require('../services/configuration.service');


router.get('/configuration/:userId', passport.authenticate('jwt', {
  session: false
}), configurationController.findConfigurationByUserId);


router.post('/configuration', [
  passport.authenticate('jwt', {
    session: false
  }), configurationService.validateCreateConfiguration
], configurationController.createConfiguration);


router.put('/configuration/:id', [
  passport.authenticate('jwt', {
    session: false
  }), configurationService.validateUpdateConfiguration
], configurationController.updateConfiguration);


router.delete('/configuration/:id', passport.authenticate('jwt', {
  session: false
}), configurationController.deleteConfiguration);


module.exports = router;