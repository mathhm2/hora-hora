'use strict';


const passport = require('passport'),
      UserModel = require('../models/user.model'),
      passportJWT = require('passport-jwt'),
      ExtractJwt = passportJWT.ExtractJwt,
      JwtStrategy = require('passport-jwt').Strategy,
      config = require('../config/config');


passport.use('jwt', new JwtStrategy({
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
  return UserModel.findById(payload._id)
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(err);
    })
}));