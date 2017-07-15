'use strict';

const esdf = require('esdf');
const bcrypt = require('bcrypt');

class User extends esdf.core.EventSourcedAggregate {
    constructor() {
        super();
        this._registered = false;
        this._name = null;
        this._email = null;
        this._password = null;
    }

    async register({name, email, password}) {
        if (this._registered) {
            return;
        }
        const hash = await bcrypt.hash(password, 10);
        this._stageEvent(new esdf.core.Event('Registered', { name, email, hash }));
    }

    onRegistered(event) {
        this._registered = true;
        this._name = event.eventPayload.name;
        this._email = event.eventPayload.email;
        this._password = event.eventPayload.hash;
    }

    isRegistered() {
        return this._registered;
    }

    getName() {
        return this._name;
    }
}

module.exports = User;