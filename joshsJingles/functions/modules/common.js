function logIP(req){
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log("ip address: -> " + ip);
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

function setupResponse(response){
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
}

exports.logIP = logIP;
exports.generateGuid = generateGuid;
exports.setupResponse = setupResponse;