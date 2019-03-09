const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
var cors = require('cors');
var order = require('./modules/orders');
var common = require('./modules/common');
var account = require('./modules/account');
var multer  = require('multer');
var bodyParser = require('body-parser');
const path = require('path');
var compression = require('compression')

admin.initializeApp(
    functions.config().firebase
)
const app = express();
const DIR = path.join(__dirname, 'uploads');

//Middleware
// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));
//Allow usage of json format.
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

//Static directories
app.use("/menu", express.static(__dirname + '/menu'));



/**
 * Tells if the shop is currently open or not.
 */
app.get('/isShopOpen', (request, response)=>{
    console.log("Checking if shop is open!");
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var ref = admin.database().ref("globalValues/isShopOpen");
    ref.once('value').then((value)=>{
        console.log(value.val());
        response.send(value.val());
        return value;
    }).catch((err)=>{
        console.log("Error getting value. " + err);
        response.send("Error " + err);
        throw err;
    });
    
});

app.get('/ping', (req,res)=>{
    console.log("User pinged server.");
    res.send("pong");
})
app.post('/fillUserData', (req,res)=>{
    account.fillUserData(req,res,admin);
});

app.post('/makeRoomForNewAccount', (req,res)=>{
    account.makeRoomForNewAccount(req,res,admin);
});

app.post('/addOrder', (req,res)=>{
    order.addOrder(req,res,admin);
});

app.delete('/removeOrder', (req,res)=>{
    order.removeOrder(req,res,admin);
});

app.get('/requestOrders', (req,res)=>{
    order.requestOrders(req,res,admin);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
