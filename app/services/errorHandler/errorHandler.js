"use strict";
const BaseService = require('../baseService')

module.exports = class ErrorHandler extends BaseService {

  handleError(err, req, res, next) {
    if (typeof (err) === 'string') {
      // custom application error
      return res.json({ error: {
          message: err,
          status: res.status
          }});
    }

    if (err.name === 'ValidationError') {
      // mongoose validation error
      return res.status(400)
        .json({ error: {
          message: err.message,
          status: 400
          }});
    }

    if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401)
        .json({ error: {
          message: 'Invalid Token',
          status: 401
          }});
    }

    // default to 500 server error
    return res.status(500)
      .json({error: {
        message: err.message,
        status: 500
        }});
  }
}
