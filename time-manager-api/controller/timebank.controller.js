'use strict';


const timebankService = require('../services/timebank.service');


// GET Timebank by ID
exports.findTimebankById = (req, res, next) => {
  return timebankService.findTimebankById(req, res, next)
    .then((timebank) => {
      return res.json(timebank);
    })
    .catch((err) => {
      res.status(500).send({
        code: 'timebank/find-by-id-error',
        message: 'There was a problem adding the information to the database'
      });
    });
}


// GET Timebank by Month and User ID
exports.findTimebankByMonthAndUserId = (req, res, next) => {
  return timebankService.findTimebankByMonthAndUserId(req, res, next)
    .then((timebank) => {
      return res.json(timebank);
    })
    .catch((err) => {
      res.status(500).send({
        code: 'timebank/find-by-month-and-userId-error',
        message: 'There was a problem adding the information to the database'
      });
    });
}


// CREATE Timebank
exports.createTimebank = (req, res, next) => {
  return timebankService.createTimebank(req, res, next)
    .then(() => {
      return res.status(200).send({
        code: 'timebank/create-success',
        message: 'Timebank saved successfully'
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 'timebank/create-error',
        message: 'There was a problem adding the information to the database'
      });
    });
}


// UPDATE Timebank
exports.updatesTimebank = (req, res, next) => {
  return timebankService.updatesTimebank(req, res, next)
    .then((timebank) => {
      if (!timebank) {
        return res.status(404).send({
          code: 'configuration/update-user-not-found',
          message: 'Configuration not found'
        })
      }
      return res.status(201).send({
        code: 'timebank/update-success',
        message: 'Timebank update successfully'
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 'timebank/update-error',
        message: 'There was a problem adding the information to the database'
      });
    });
}