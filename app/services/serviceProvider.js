"use strict";

module.exports = class ServiceProvider {
  constructor(service) {
    console.log(service.name);
    return service.make(service)
  }
};
