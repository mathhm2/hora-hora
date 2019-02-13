'use strict';


const router = require('express').Router(),
  passport = require('passport'),
  timebankController = require('../controller/timebank.controller'),
  timebankService = require('../services/timebank.service');


router.get('/timebank/:id', passport.authenticate('jwt', {
  session: false
}), timebankController.findTimebankById);


router.get('/timebank/mounth/user/:userId', passport.authenticate('jwt', {
  session: false
}), timebankController.findTimebankByMonthAndUserId);


router.post('/timebank', [
  passport.authenticate('jwt', {
    session: false
  }), timebankService.validateCreateTimebank
], timebankController.createTimebank);


router.put('/timebank/:id', [
  passport.authenticate('jwt', {
    session: false
  }), timebankService.validateUpdateTimebank
], timebankController.updatesTimebank);