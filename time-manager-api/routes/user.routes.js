'use strict';


const router = require('express').Router(),
      passport = require('passport'),
      userController = require('../controller/user.controller');


router.get('/user', passport.authenticate('jwt', {
  session: false
}), userController.listAllUsers);

router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);


module.exports = router;