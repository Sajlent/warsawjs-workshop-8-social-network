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
            return user.register({ name: 'Agata', email: 'test@test.pl', password: 'test' }).then(function () {
                assert.equal(user.isRegistered(), true);
                assert.equal(user.getName(), 'Agata');
            });
        });
        it('should be idempotent', function () {
            const user = new User();
            return user.register({ name: 'Agata', email: 'test@test.pl', password: 'test' }).then(function () {
                const beforeCount = user.getStagedEvents().length;
                user.register({ name: 'Agata', email: 'test@test.pl', password: 'test' });
                const afterCount = user.getStagedEvents().length;
                assert.equal(beforeCount, afterCount);
            });
        })
    });
});

