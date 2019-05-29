const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const yargs = require('yargs');

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

geocode.geoAddress(argv.a, (errorMsg, results) => {
    if(errorMsg){
        console.log(errorMsg);
    }
    else{
        console.log(results.Address);
        weather.getWeather(results.Latitudinal, results.Longitudinal, (errorMsg, temp) => {
            if(errorMsg){
                console.log(errorMsg);
            }
            else{
                console.log(`It's currently ${temp}`);
            }
        });
    }
});



// API KEY = 3b5097356d7048db3dc5a53c5e5bcee8