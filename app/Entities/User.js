'use strict';

const esdf = require('esdf');

class User extends esdf.core.EventSourcedAggregate {
    constructor() {
        super();
        this._registered = false;
        this._name = null;
        this._email = null;
    }

    register({name, email}) {
        this._stageEvent(new esdf.core.Event('Registered', { name, email }));

        // this.name = name;
        // this.email = email;
        //this._registered = true;
    }

    onRegistered(event) {
        this._registered = true;
        this._name = event.eventPayload.name;
        this._email = event.eventPayload.email;
    }

    isRegistered() {
        return this._registered;
    }

    getName() {
        return this._name;
    }
}

module.exports = User;