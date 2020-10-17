const request = require('request');//Load request node module

const forecast = (data,callback) => {
    //Weather stack url to fetch weather data of New York city
    const url = `http://api.weatherstack.com/current?access_key=7957bbfba298bb62fc58bae0e0973aeb&query=${encodeURIComponent(data.latitude,data.longitude)}`;

    //Initialise request object to call weather stack api
    request(
        {
            url:url,//Pass the url of weatherstack api
            json:true//Get response in JSON format
        },
        (error,response)=>{
            if(error){
                callback(error,undefined);
            }
            else if(response.body.error){
                console.log(response.body.error);
                callback("Some error has occurred",undefined);
            }
            else{
                const current = response.body.current;
                callback(undefined,current)
            }
        }
    );
};

module.exports = forecast;