const yargs = require('yargs');
const axios = require('axios');
var argv = yargs
          .options({
                a:{
                    demand: true,
                    description: 'to fetch weather of given address',
                    alias: 'address',
                    string: true
                }
          })
          .help()
          .alias('help','h')
          .argv;

var encodedadd = encodeURIComponent(argv.address);

var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedadd}`;
 axios.get(url).then((response) =>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to found the Address');
    }
    var Address = response.data.results[0].formatted_address;
    var Latitudinal = response.data.results[0].geometry.location.lat;
    var Longitudinal = response.data.results[0].geometry.location.lng;

    console.log(Address);
    var weatherUrl = `https://api.darksky.net/forecast/3b5097356d7048db3dc5a53c5e5bcee8/${Latitudinal},${Longitudinal}`;

    return axios.get(weatherUrl);

 }).then((response) => {
    var temp = response.data.currently.temperature;
    var appTemp = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temp}. But it seem like ${appTemp}`);
 }).catch((e) => {
     if(e.code === "ENOTFOUND"){
        console.log('Unable to connect to Google API Server');
     }else{
        console.log(e.message);
     }
});
