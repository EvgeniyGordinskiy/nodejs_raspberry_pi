'use strict';
const BaseService = require('../baseService');
const ResponseHandler = require('./responseHandler');

class ResponseService extends BaseService {

    constructor(params) {
        super();
        ResponseService.handler = new ResponseHandler(params);
    }

    get(obj, param) {
        if (ResponseService.handler) {
            return ResponseService.handler[param];
        } else {
            return obj[param];
        }
    }
}

module.exports = ResponseService;
