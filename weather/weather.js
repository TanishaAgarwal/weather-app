const request = require('request');


var getWeather = (lat, lng, callback) => {

    var url =  `https://api.darksky.net/forecast/3b5097356d7048db3dc5a53c5e5bcee8/${lat},${lng}`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Cannot connect to google server..');
        }
        else if(response.statusCode === 400){
            callback('not found the address');
        }
        else if(response.statusCode === 200){
            callback(undefined, body.currently.temperature);
        } 
    });
};


module.exports = {
    getWeather
};