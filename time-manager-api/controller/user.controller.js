'use strict';


const userService = require('../services/user.service');


// GET All Users
exports.listAllUsers = (req, res, next) => {
  return userService.listAllUsers(req, res, next)
    .then(users => res.json(users))
    .catch(err => next(err));
}


// GET User by ID
exports.getUserById = (req, res, next) => {
  return userService.getUserById(req, res, next)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          code: 'user/not-found',
          message: 'User not found'
        });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send('There was a problem fiding the user.', err)
    });
}


// POST a User
exports.createUser = (req, res, next) => {
  return userService.createUser(req, res, next)
    .then(() => {
      res.status(200).send({
        code: 'user/save-success',
        message: 'User saved successfully'
      });
    })
    .catch((err) => {
      res.status(500).send('There was a problem adding the information to the database.', err);
    });
}


// PUT || UPDATE a User
exports.updateUser = (req, res, next) => {
  return userService.updateUser(req, res, next)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          code: 'user/not-found',
          message: 'User not found'
        });
      }
      res.status(200).send({
        code: 'user/update-success',
        message: 'User updated successfully'
      });
    })
    .catch((err) => {
      res.status(500).send('There was a problem updating the user.', err);
    });
}

//DELETE a User
exports.deleteUser = (req, res, next) => {
  return userService.deleteUser(req, res, next)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          code: 'user/not-found',
          message: 'User not found'
        });
      }
      res.status(200).send({
        code: 'user/delete-success',
        message: 'User deleted successfully'
      });
    })
    .catch((err) => {
      res.status(500).send('There was a problem deleting the user.', err);
    });
}