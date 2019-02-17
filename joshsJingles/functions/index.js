const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
var cors = require('cors');

admin.initializeApp(
    functions.config().firebase
)

const app = express();



// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));
//Allow usage of json format.

app.use(express.json());
/**
 * Tells if the shop is currently open or not.
 */
app.get('/isShopOpen', (request, response)=>{
    console.log("Checking if shop is open!");
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var ref = admin.database().ref("globalValues/isShopOpen");
    ref.once('value').then((value)=>{
        response.send(value.val());
        return value;
    }).catch((err)=>{
        console.log("Error getting value. " + err);
        response.send("Error " + err);
        throw err;
    });
    
});
app.post('/fillUserData', (request,response)=>{
    
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var json = JSON.parse(request.body);
    console.log("Json");
    console.log(json);
    var ref = admin.database().ref("users/" + json.uid);
    ref.set(json.userData).then(()=>{
        response.send({"success": true, "error": err});
        return true;
    }).catch((err)=>{
        console.log("Error setting value. " + err);
        response.send({"success": false, "error": err});
        throw err;
    });
   
});

app.post('/makeRoomForNewAccount', (request,response)=>{
    //Check if email already has account. If email already has account but does not have their email verified,
    //then delete that account so that a new one can overwrite it.
    console.log("Making room for new account!");
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var json = JSON.parse(request.body);

    console.log("Json");
    console.log(json);
    console.log(json.email);
    admin.auth().getUserByEmail(json.email).then((userRecord)=>{
        console.log("User Record: ");
        console.log(userRecord);
        response.send(JSON.stringify({"success":true}));
        return true;
    }).catch((error)=>{
        console.log("Error fetching user data:", error);
        response.send(JSON.stringify({"success":true}));
        throw error;
    });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
