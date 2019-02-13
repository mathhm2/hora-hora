'use strict';


const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    expressValidator  = require('express-validator'),
    cors = require('cors'),
    passport = require('passport'),
    passportConfig = require('../utils/auth'),
    jwt = require('jsonwebtoken'),
    config = require('./config'),
    database = require('./db')(mongoose, config),

    authRouters = require('../routes/auth.routes'),
    userRouters = require('../routes/user.routes'),
    configurationRouters = require('../routes/configuration.routes');


app.use(express.static('.'));
app.use(bodyParser.urlencoded({
    extended: true 
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());


app.use('/api', authRouters);
app.use('/api', userRouters);
app.use('/api', configurationRouters);


module.exports = app;