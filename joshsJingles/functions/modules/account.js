var common = require('./common');

function fillUserData(req,res,admin){
    common.setupResponse(res);
    common.logIP(req);
    var json = JSON.parse(req.body);
    console.log("Json");
    console.log(json);
    var ref = admin.database().ref("users/" + json.uid);
    ref.set(json.userData).then(()=>{
        res.send({"success": true, "error": err});
        return true;
    }).catch((err)=>{
        console.log("Error setting value. " + err);
        res.send({"success": false, "error": err});
        throw err;
    });
}

function makeRoomForNewAccount(req,res,admin){
    //Check if email already has account. If email already has account but does not have their email verified,
    //then delete that account so that a new one can overwrite it.
    console.log("Making room for new account!");
    common.setupResponse(res);
    common.logIP(req);
    var json = JSON.parse(req.body);

    admin.auth().getUserByEmail(json.email).then((userRecord)=>{
        console.log("User Record: ");
        console.log(userRecord);
        res.send(JSON.stringify({"success":true}));
        return true;
    }).catch((error)=>{
        console.log("Error fetching user data:", error);
        res.send(JSON.stringify({"success":true}));
        throw error;
    });
}

exports.fillUserData = fillUserData;
exports.makeRoomForNewAccount = makeRoomForNewAccount;