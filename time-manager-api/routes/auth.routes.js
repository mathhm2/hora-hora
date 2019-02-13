'use strict';


const router = require('express').Router(),
      authController = require('../controller/auth.controller'),
      authService = require('../services/auth.service');


router.post('/signup', authService.validateSignUp, authController.signup);
router.post('/login', authService.validateLogin, authController.login);



module.exports = router;