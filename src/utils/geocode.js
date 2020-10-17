const request = require('request');//Load request node module

const geoCode = (address,callbackFunction) => {
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW51cmFnMTQ3IiwiYSI6ImNrZzBnaWJ6azBjejcycm8ya2gzeWYwdjgifQ.WTABWcxJjImg5SAKIvR3hQ`;
    //Initialise request object to call weather stack api
    request(
        {
            url:mapUrl,//Pass the url of weatherstack api
            json:true//Get response in JSON format
        },
        (error,response)=>{
            if(error){
                callbackFunction(error,undefined);
            }
            else if(response.body.error){
                callbackFunction("Some error has occurred",undefined);
            }
            else if(response.body.features.length === 0){
                callbackFunction("unable to search this location",undefined);
            }
            else{
                const latitude = response.body.features[0].center[1];
                const longitude = response.body.features[0].center[0];
                const location = response.body.features[0].place_name;
                callbackFunction(undefined, {latitude,longitude,location});
            }
        }
    );
}

module.exports = geoCode;