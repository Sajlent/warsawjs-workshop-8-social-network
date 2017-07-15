'use strict';

const User = require('../Entities/User');

module.exports = async function registerUser({ repository }, params) {
    return await repository.invoke(User, params.userID, async function (userInstance) {
        await userInstance.register(params);
        console.log('isRegister %s', userInstance.isRegistered());
    });
};