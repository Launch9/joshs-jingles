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

function GenerateGuid(length) {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    var guid = "";
    for (i = 0; i < length; i++) {
        guid += S4();
    }
    return guid;
}

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

app.post('/addOrder', (request,response)=>{
    /*Logging information about the request*/
    console.log("Adding order!");
    var ip = request.header('x-forwarded-for') || request.connection.remoteAddress;
    console.log("ip address: -> " + ip);
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var json = JSON.parse(request.body);
    var orderUUID = GenerateGuid(16);
    var ref = admin.database().ref("globalOrders/" + orderUUID)
    var userRef = admin.database().ref("users/" + json.uid + "/requests/");
    json['orderUUID'] = orderUUID;
    ref.set(json.userData).then(()=>{
        userRef.push(orderUUID).then(()=>{
            response.send({"success": true});
            return true;
        }).catch((err)=>{
            console.log("Error setting value. " + err);
            response.send({"success": false, "error": err});
            throw err;
        })
        
    }).catch((err)=>{
        console.log("Error setting value. " + err);
        response.send({"success": false, "error": err});
        throw err;
    });
    
    
});

app.get('/requestOrders', (request,response)=>{
    /*Logging information about the request*/
    console.log("Getting orders!");
    var ip = request.header('x-forwarded-for') || request.connection.remoteAddress;
    console.log("ip address: -> " + ip);
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var userUID = request.query.userUID;
    console.log(userUID);
    var userRef = admin.database().ref("users/" + userUID + "/requests/");
    var returnList = [];
    var keyList = [];
    userRef.once('value').then((snap)=>{

        snap.forEach(function(item) {
            console.log(item.val());
            keyList.push(item.val());
        });
        
        for(var i = 0; i < keyList.length; i++){
            var globalRef = admin.database().ref("globalOrders/" + keyList[i]);
            globalRef.once('value').then((value2)=>{
                returnList.push(value2.val());
                if(returnList.length === keyList.length){
                    response.send({"success": true, "value":returnList});
                }
            });
        }
        
        return true;
    }).catch((err)=>{
        console.log("Error getting orders. "  + err);
        response.send({"success": false, "value":null});
        throw err;
    });
    
    
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
