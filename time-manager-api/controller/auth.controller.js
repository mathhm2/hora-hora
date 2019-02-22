'use strict';


const authService = require('../services/auth.service');


// Signup
exports.signup = (req, res, next) => {
  return authService.validateUser(req, res, next)
    .then((user) => {
      if (user) {
        res.status(401).send({
          code: 'auth/signup-error',
          message: 'Email already used.'
        });
      } else {
        return authService.signup(req, res, next)
          .then(() => {
            res.status(200).send({
              code: 'auth/signup-success',
              message: 'User signup successfully.'
            });
          })
          .catch((err) => {
            res.status(500).send('There was a problem loggin in.', err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send('There was a problem fiding the user.', err);
    });
}


// Login
exports.login = (req, res, next) => {
  return authService.validateUser(req, res, next)
    .then((user) => {
      if (!user) {
        res.status(401).send({
          code: 'auth/login-error',
          message: 'User not found'
        })
      } else {

        return user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch && err) {
            res.status(401).send({
              code: 'auth/password-wrong',
              message: 'Authentication failed. Wrong password.'
            });
          } else {
            const token = authService.login(user)
            if (token) {
              res.status(200).send({
                code: 'auth/login-success',
                message: 'User logedin successfully',
                user: user,
                token: token
              })
            } else {
              res.status(500).send({
                code: 'auth/token-provider-error',
                message: 'Failed to issue token'
              })
            }
          }
        })
      }
    })
}