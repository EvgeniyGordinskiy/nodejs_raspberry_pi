"use strict";

class BaseService {

  constructor() {
    return new Proxy(this, {
      set: this.set,
      get: this.get
    })
  }

  /**
   *  Magic method for setting property
   * @param obj
   * @param prop
   * @param value
   * @returns {*}
   */
  set(obj, prop, value){
    obj[prop] = value;
    return true
  }

  /**
   *  Magic method for getting property
   * @param obj
   * @param name
   * @returns {*}
   */
  get(obj, name){
    console.log(name);
    return obj[name];
  }

  /**
   *  Method for creating service's instance
   */
  static make(service, params) {
    return new service(params)
  }
};

module.exports = BaseService;
