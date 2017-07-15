'use strict';

const esdf = require('esdf');
const serviceFunction = require('../DomainServices/registerUser');

module.exports = function () {
    this.requires('repository');
    this.provides('services', function ({ repository }) {
        const serviceContainer = new esdf.services.ServiceContainer();
        //serviceContainer.addResource('config', config);
        serviceContainer.addResource('repository', repository);
        serviceContainer.addService('registerUser', serviceFunction);
        return serviceContainer;
    });
};
