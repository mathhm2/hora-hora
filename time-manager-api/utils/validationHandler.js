'use strict';


function validationHandler(errors, res) {
  if (errors) {
    var response = {
      errors: []
    };
    errors.forEach(function (err) {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }
}


module.exports = validationHandler;