'use strict';

module.exports = function () {
    this.provides('config', function () {
        return {
            passwordCost: 12,
            firebase: {
                email: process.env.FIREBASE_EMAIL,
                password: process.env.FIREBASE_PASSWORD
            }
        }
    });
};