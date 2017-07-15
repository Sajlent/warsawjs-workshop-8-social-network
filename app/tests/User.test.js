'use strict';

const User = require('../Entities/User');
const assert = require('assert');

describe('User', function () {
    describe('#constructor', function () {
        it('should not register user right away', function () {
            const user = new User();
            assert.equal(user.isRegistered(), false);
        });
    });
    describe('#register', function () {
        it('should make the user registered', function () {
            const user = new User();
            user.register({ name: 'Agata', email: 'test@test.pl' });
            assert.equal(user.isRegistered(), true);
            assert.equal(user.getName(), 'Agata');

            console.log(user.getStagedEvents());
        });
    });
});

