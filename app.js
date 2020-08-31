require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request")

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

let weather;
let iconUrl = "";


app.get('/', (req, res) => {
    if (weather === undefined){
        res.render('home');
    } else {
        res.render("weather", {weatherView: weather, icon: iconUrl})
    }
});

app.post("/",async (req, res) => {
     
    const query = req.body.cityName;
    const apiKey = process.env.APIKEY;
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
    request(url, (err, respones, body) => {
        weather = JSON.parse(body);
        const iconID = weather.weather[0].icon;
        iconUrl = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
        res.redirect("/")
    })
    
})





app.listen(3000, function() {
    console.log("Server is running on port 3000");
});