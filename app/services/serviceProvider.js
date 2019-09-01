"use strict";

 class ServiceProvider {

  /**
   *
   * @param service
   * @param params which be used for creating an instance
   * @returns An instance of the service
   */
  static getService(service, params = null) {
    console.log(service.name);
    if (ServiceProvider.cacheAbleInstances.includes(service.name)) {
      return ServiceProvider.getServiceFromCache();
    }
    return service.make(service, params)
  }

  static getServiceFromCache(service) {

  }
}

ServiceProvider.cacheAbleInstances = [];

module.exports = ServiceProvider;


