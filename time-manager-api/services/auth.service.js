'use strict';

const UserModel = require('../models/user.model'),
  config = require('../config/config'),
  jwt = require('jsonwebtoken'),
  validationHandler = require('../utils/validationHandler');


exports.signup = (req, res, next) => {
  const body = req.body;

  return UserModel.create({
    email: body.email,
    password: body.password
  });
}


exports.login = (user) => {
  const token = jwt.sign({
    _id: user._id,
    email: user.email
  }, config.secret, {
    expiresIn: '3h'
  }, {
    algorithm: 'HS256'
  });
  return token;
}


exports.validateUser = (req, res, next) => {
  const body = req.body;

  return UserModel.findOne({
    email: body.email
  });
}


exports.validateSignUp = (req, res, next) => {
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Invalid password').notEmpty();
  req.checkBody('password', 'Password field must be 6 character long').isLength({
    min: 6
  });
  var errors = req.validationErrors();
  validationHandler(errors, res);
  return next();
}


exports.validateLogin = (req, res, next) => {
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password field must be 6 character long').isLength({
    min: 6
  });
  var errors = req.validationErrors();
  validationHandler(errors, res);
  return next();
}