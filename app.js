'use strict';

const modules = [
    require('./app/Modules/sink'),
    require('./app/Modules/repository')
];

// function db() {
//     this.requires('connectionURL');
//     this.provides('db', function (connectionURL) {
//         return new SomeDBImplementation(connectionURL);
//     });
// }



const CompositionManager = require('app-compositor').CompositionManager;
const app = new CompositionManager;
app.runModules(modules).done(async function ({ repository }) {
    const User = require('./app/Entities/User');
    await repository.invoke(User, 'aaa', async function (user) {
        await user.register({ name: 'Agata', email: 'test@test.pl', password: 'test' });
        console.log('isRegistered: %s', user.isRegistered());
    });
    repository.invoke(User, 'aaa', async function (user) {
        console.log('is still registered: %s', user.isRegistered());
    });
});