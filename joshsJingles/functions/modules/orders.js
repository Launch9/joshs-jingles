var common = require("./common");
var email = require("./email");
function removeOrder(req,res,admin){
    /*Logging information about the request*/
    console.log("Removing order!");
    common.logIP(req);
    common.setupResponse(res);
    
    console.log("This is the json:");
    console.log(req.body);
    var json = req.body;
    
    var orderUID = json.orderUID;
    var ref = admin.database().ref("globalOrders/" + orderUID);
    var userRef = admin.database().ref("users/" + json.uid + "/requests/");
    userRef.orderByValue().equalTo(orderUID).on('child_added', function(snapshot) {
        console.log("Logging snapshot!");
        console.log(snapshot.ref);
        snapshot.ref.remove().then(()=>{
            console.log("Removed reference...");
            ref.once('value',(value)=>{
                console.log("logging value in removeORder!");
                console.log(value.val());
                email.sendEmail("Order removed: ", "Order removed is: \n\n" + JSON.stringify(value.val()));
                ref.remove().then((result)=>{
                    res.send({"success": true, "error": "", "value": result});
                    return true;
                }).catch((error)=>{
                    console.log("Failed to remove order: " + error);
                    res.send({"success": false, "error": error});
                    throw error;
                });
            })
            return true;
        }).catch((error)=>{
            console.log("Error remove order: " + error);
            res.send({"success": false, "error": error});
            throw error;
        });
    });
}

function requestOrders(req,res,admin){
    /*Logging information about the request*/
    console.log("Getting orders!");
    common.logIP(req);
    common.setupResponse(res);
    var userUID = req.query.userUID;
    console.log(userUID);
    var usersRef = admin.database().ref("users/");
    var userRef = admin.database().ref("users/" + userUID + "/requests/");
    var returnList = [];
    var keyList = [];
    console.log(userUID);
    usersRef.child(userUID).once('value', function(snapshot) {
        if (snapshot.exists()) {
            console.log("Snapshot exists!");
            userRef.once('value').then((snap)=>{
                console.log("Does exist!");
                snap.forEach(function(item) {
                    console.log(item.val());
                    keyList.push(item.val());
                });
                
                if(keyList.length === 0){
                    res.send({"success": true, "value":[]});
                    return true;
                }else{
                    for(var i = 0; i < keyList.length; i++){
                        var globalRef = admin.database().ref("globalOrders/" + keyList[i]);
                        globalRef.once('value').then((value2)=>{
                            returnList.push(value2.val());
                            if(returnList.length === keyList.length){
                                res.send({"success": true, "value":returnList});
                            }
                            return true;
                        }).catch((error)=>{
                            console.error(error);
                            throw(error);
                        });
                    }
                }
                
                
                return true;
            }).catch((err)=>{
                console.log("Error getting orders. "  + err);
                res.send({"success": false, "value":[]});
                throw err;
            });
        }
        else{
            console.log("Snapshot does not exist!");
            res.send({"success": true, "value":[]});
        }
    });

    
}

function updateOrder(req,res,admin){
    /*Logging information about the request*/
    console.log("Updating order!");
    common.logIP(req);
    common.setupResponse(res);
    var json = JSON.parse(req.body);
    /*Sending email*/
    email.sendEmail("Updating order: ", "Order updated as:\n\n " + req.body);
    var orderUUID = json.orderUID;
    var ref = admin.database().ref("globalOrders/" + orderUUID)
    console.log("Cave story is a great game: ");
    console.log(json);
    ref.set(json.data).then(()=>{
        res.send({"success": true});
        return true;
    }).catch((err)=>{
        console.log("Error setting value. " + err);
        res.send({"success": false, "error": err});
        throw err;
    });
    
}

function addOrder(req,res,admin){
    /*Logging information about the request*/
    console.log("Adding order!");
    common.logIP(req);
    common.setupResponse(res);
    var json = JSON.parse(req.body);
    /*Sending email*/
    email.sendEmail("Adding order: ", "Order created is:\n\n " + req.body);
    var orderUUID = common.generateGuid(16);
    var ref = admin.database().ref("globalOrders/" + orderUUID)
    var userRef = admin.database().ref("users/" + json.uid + "/requests/");
    json['data']['orderUUID'] = orderUUID;
    console.log("Cave story is a great game: ");
    console.log(json);
    ref.set(json.data).then(()=>{
        userRef.push(orderUUID).then(()=>{
            res.send({"success": true});
            return true;
        }).catch((err)=>{
            console.log("Error setting value. " + err);
            res.send({"success": false, "error": err});
            throw err;
        })
        return true;
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
exports.updateOrder = updateOrder;