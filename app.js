'use strict';

require('dotenv').config();

const modules = [
    require('./app/Modules/sink'),
    require('./app/Modules/streamer'),
    require('./app/Modules/publisher'),
    require('./app/Modules/subscriber'),
    require('./app/Modules/repository'),
    require('./app/Modules/config'),
    require('./app/Modules/projectionDB'),
    require('./app/Modules/projectionBuilder'),
    require('./app/Modules/services')
];

// function db() {
//     this.requires('connectionURL');
//     this.provides('db', function (connectionURL) {
//         return new SomeDBImplementation(connectionURL);
//     });
// }



const CompositionManager = require('app-compositor').CompositionManager;
const app = new CompositionManager;
app.runModules(modules).done(async function ({ streamer, subscriber, services }) {
    streamer.start();
    subscriber.queue('eventLogger').bind('*.*').listen(function ({ event, commit }) {
         console.log('* %s.%s: %j', commit.aggregateType, event.eventType, event.eventPayload);
    });
    const registerUser = services.service('registerUser');
    registerUser({ userID: '222', name: 'Agata', email: 'test2@test.pl', password: 'test2' });
});