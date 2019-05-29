const request = require('request');

var geoAddress = (address, callback) => {
    var encodedadd = encodeURIComponent(address);

    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedadd}&key=AIzaSyArue3mB2ifINLkZhumlEqjZEvn9YVzGa4`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Cannot connect to google server..');
        }
        else if(body.status === 'ZERO_RESULTS'){
            callback('Not able to found the address..');
        }
        else if(body.status === "OK"){
            callback(undefined, {
                Address: body.results[0].formatted_address,
                Longitudinal: body.results[0].geometry.location.lng,
                Latitudinal: body.results[0].geometry.location.lat
            });
        }
    });
};

module.exports = {
    geoAddress
};