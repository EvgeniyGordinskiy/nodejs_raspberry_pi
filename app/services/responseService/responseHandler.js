'use strict'
const {APIResponse} = require('rest-api-response');

class ResponseHandler extends APIResponse{
    constructor(params) {
        super(params);
    }

    respondWithError(msg = null) {
        if (!msg) {
            msg = 'Error occurred';
        }
        return this.serverError(msg);
    }
}

module.exports = ResponseHandler;
