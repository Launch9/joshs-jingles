var bannedIPs = [];

function logIP(req){
    var ip = getIP(req);
    console.log("ip address: -> " + ip);
    console.log("UTC -> " + new Date());
}

function getIP(req){
    return req.header('x-forwarded-for') || req.connection.remoteAddress;
}

function endRequest(){
    console.log("Request ended at: " + new Date());
}

function generateGuid(length) {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    var guid = "";
    for (i = 0; i < length; i++) {
        guid += S4();
    }
    return guid;
}

function checkWhiteList(req){
    var ip = getIP(req);
    for(var i = 0; i < bannedIPs; i++){
        if(ip === bannedIPs){
            console.warn("BANNED IP ATTEMPTED TO ACCESS SERVER! -> ip: " + ip);
            return false;
        }
    }
    return true;
}

function setupResponse(response){
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
}

exports.logIP = logIP;
exports.generateGuid = generateGuid;
exports.setupResponse = setupResponse;
exports.checkWhiteList = checkWhiteList;