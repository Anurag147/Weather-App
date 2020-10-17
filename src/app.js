const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Initialize web server through express js
const app = express();
const port = process.env.PORT || 3000; //Choose 3000 port when running locally

//Use handle bars for dynamic templating, ensure the key name below is set correctly as view engine
const templatesFilePath = path.join(__dirname,"../templates/views");
const partialsFilePath = path.join(__dirname,"../templates/partials");
app.set('view engine','hbs');//Handle bar syntax to initialize template views
app.set('views',templatesFilePath);
hbs.registerPartials(partialsFilePath);//Register partial files path with hbs

//Load static files
//Go one folder up and navigate to public folder
const publicFilePath = path.join(__dirname,"../public");
app.use(express.static(publicFilePath));

//Load dynamic template using handle bars on root home page
app.get('',(req,res)=>{
    //This will load handlebar template from /views/index.hbs
    //Pass dynamic data to handle bar view as second argument
    res.render('index',{
        title:'Weather App',
        name:'Anurag Asthana'
    });
});

app.get('/about',(req,res)=>{
    //This will load handlebar template from /views/about.hbs
    //Pass dynamic data to handle bar view as second argument
    res.render('about',{
        title:'About Page',
        name:'Anurag Asthana'
    });
});

app.get('/help',(req,res)=>{
    //This will load handlebar template from /views/help.hbs
    //Pass dynamic data to handle bar view as second argument
    res.render('help',{
        title:'Help Page'
    });
});

//When called without route path below response will be sent, for eg: localhost:3000
//req: Request Object; res: Response Object
//Send JSON response
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'Please provide an address'
        });
    }
    else{
            //Send recieved location from query string
            getForeCastDetails(req.query.address,res);
    }
});

//For all other routes which are not found display page not found message
app.get('*',(req,res)=>{
    res.render('notfound',{
        title:'404',
        name:'Anurag Asthana',
        errorMessage:'Page not found'
    });
});

//Start Express web server at port no. 3000 
app.listen(port,()=>{
    console.log('Server is up on port 3000');
});

//Retrieve forecast details from address provided by the user and return the response to the caller
const getForeCastDetails = (inputAddress,res) => {
    let foreCastDetails = {
        location:'',
        foreCast:''
    }
    geoCode(inputAddress, (error,response) => {
        if(!error){
            foreCastDetails.location = response.location;
            forecast(response,(error,response)=>{
                if(!error){
                    foreCastDetails.foreCast = response;
                    res.send({
                        address:inputAddress,
                        forecast:foreCastDetails.foreCast.weather_descriptions[0],
                        location:foreCastDetails.location
                    });
                }
            });
        }
    });
}


