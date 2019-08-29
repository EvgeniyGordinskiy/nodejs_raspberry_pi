"use strict";

module.exports = class BaseService {

  /**
   * Callback for creating new instance of the service
   * @returns {*}
   */
  static createInstanceCallBack() {
    return new this.serviceTarget
  }
  /**
   *  Method for creating service's instance
   */
  static make(service) {
    this.serviceTarget = service
    return this.createInstanceCallBack()
  }
};
