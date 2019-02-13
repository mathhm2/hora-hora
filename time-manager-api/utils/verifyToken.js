'use strict';


const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.verifyToken = (req, res, next) => {

    // Check header or url parameters or post parameters for token
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }

        req.decoded = decoded;
        next();
    })
}