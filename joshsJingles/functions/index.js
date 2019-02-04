const functions = require('firebase-functions');
const express = require('express');
const firebase = require('firebase-admin');
var cors = require('cors');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
)
const app = express();


// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));
/**
 * Tells if the shop is currently open or not.
 */
app.get('/isShopOpen', (request, response)=>{
    var ref = firebaseApp.database().ref("globalValues/isShopOpen");
    ref.once('value').then((value)=>{
        response.send(value.val());
        return value;
    }).catch((err)=>{
        console.log("Error getting value. " + err);
        response.send("Error " + err);
    });
    
});
app.get('/timestamp', (request, response) => {
    response.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.send(`${Date.now()}`);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
