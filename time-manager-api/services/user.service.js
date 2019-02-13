'use strict';


const User = require('../models/user.model');


exports.listAllUsers = (req, res, next) => {
    return User.find();
}


exports.getUserById = (req, res, next) => {
    return User.findById(req.params.id);
}


exports.createUser = (req, res, next) => {
    const body = req.body;
    return User.create(body);
}


exports.updateUser = (req, res, next) => {
    const body = req.body;
    return User.findByIdAndUpdate(req.params.id, body);
}


exports.deleteUser = (req, res, next) => {
    return User.findByIdAndDelete(req.params.id);
}