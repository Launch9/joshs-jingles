var common = require("./common");

function removeOrder(req,res,admin){
    /*Logging information about the request*/
    console.log("Removing order!");
    common.logIP(req);
    common.setupResponse(res);
    var json = JSON.parse(req.body);
    var orderUID = json.orderUID;
    var ref = admin.database().ref("globalOrders/" + orderUID)
    var userRef = admin.database().ref("users/" + json.uid + "/requests/");
    userRef.orderByValue().equalTo(orderUID).on('child_added', function(snapshot) {
        snapshot.ref().remove().then(()=>{
            ref.remove(orderUID).then((result)=>{
                res.send({"success": true, "error": "", "value": result});
                return true;
            }).catch((error)=>{
                console.log("Failed to remove order: " + error);
                res.send({"success": false, "error": err});
                throw error;
            });
        }).catch((error)=>{
            console.log("Error remove order: " + err);
            res.send({"success": false, "error": err});
            throw error;
        });
    }).catch((error)=>{
        console.log("Error ordering by value: " + err);
        res.send({"success": false, "error": err});
        throw error;
    });
}

function requestOrders(req,res,admin){
    /*Logging information about the request*/
    console.log("Getting orders!");
    common.logIP(req);
    common.setupResponse(res);
    var userUID = req.query.userUID;
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
                    res.send({"success": true, "value":returnList});
                }
            });
        }
        
        return true;
    }).catch((err)=>{
        console.log("Error getting orders. "  + err);
        res.send({"success": false, "value":null});
        throw err;
    });
}

function addOrder(req,res,admin){
    /*Logging information about the request*/
    console.log("Adding order!");
    common.logIP(req);
    common.setupResponse(res);
    var json = JSON.parse(req.body);
    var orderUUID = common.generateGuid(16);
    var ref = admin.database().ref("globalOrders/" + orderUUID)
    var userRef = admin.database().ref("users/" + json.uid + "/requests/");
    json['userData']['orderUUID'] = orderUUID;
    ref.set(json.userData).then(()=>{
        userRef.push(orderUUID).then(()=>{
            res.send({"success": true});
            return true;
        }).catch((err)=>{
            console.log("Error setting value. " + err);
            res.send({"success": false, "error": err});
            throw err;
        })
        
    }).catch((err)=>{
        console.log("Error setting value. " + err);
        res.send({"success": false, "error": err});
        throw err;
    });
}

//Defining exports
exports.removeOrder = removeOrder;
exports.requestOrders = requestOrders;
exports.addOrder = addOrder;