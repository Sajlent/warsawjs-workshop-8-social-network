'use strict';

const firebase = require('firebase');

module.exports = function () {
    this.requires('config');
    this.provides('projectionDB', function ({ config }) {
        const firebaseConfig = {
            apiKey: "AIzaSyAdicGGKM1ySdAd6czWXlSmI7DmWe0OgPU",
            authDomain: "socialnetwork-a5de3.firebaseapp.com",
            databaseURL: "https://socialnetwork-a5de3.firebaseio.com",
            projectId: "socialnetwork-a5de3",
            storageBucket: "socialnetwork-a5de3.appspot.com",
            messagingSenderId: "922690454087"
        };
        const app = firebase.initializeApp(firebaseConfig);
        const db = app.database();
        return app.auth().signInWithEmailAndPassword(config.firebase.email, config.firebase.password).then(function () {
            return db;
        });
    })
};
