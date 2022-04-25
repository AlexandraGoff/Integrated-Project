const express = require('express');
const app = express();
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Datastore = require('nedb');
app.listen(3000, () => console.log("Listening on port 3000."));
app.use(express.static('public'));
const path = require("path");

const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.json()); //can use parameters in json brackets like.... {limit: '1mb'}
app.post('/api', (request, response) => {
    console.log(request.body.lat + "I got a request!");
    const timestamp = Date.now();
    const data = request.body;
    data.timestamp=timestamp;
    database.insert(data);
    response.json({
        status: 'success',
        timestamp: timestamp,
        lattitude: request.body.lat,
        longitude: request.body.long
    });
});


app.get('/api', (request, response) => {
database.find({},(err,data) => {
    if(err)
    {
        response.end();
        return;
    }
    response.json(data);
})
});



app.get('/weather/:lat/:long', async (request, response) => {
    const lat = request.params.lat;
    const long = request.params.long;

    const api_url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=296ba72e41ea4b8f0dbac0aba9d4295d';
    const fetch_response = await fetch(api_url); //must be async function
    const json = await fetch_response.json();
    response.json(json);
    //https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=296ba72e41ea4b8f0dbac0aba9d4295d
});

app.get('/display',(req,res) => {
    let context = {title:"api",message:"root"}
    const url = path.join(__dirname,'./public/display_flights.html');
    res.sendFile(url,context);
  })



app.get('/get_flights/:dep/:arr', async (request, response) => {
    const dep = request.params.dep;
    const arr = request.params.arr;

    const api_url = 'https://airlabs.co/api/v9/schedules?api_key=93609626-7660-477e-9843-380a3648f10d&dep_iata='+dep+'&arr_iata='+arr+'&_fields=flight_number,dep_time,arr_time,flight_iata';
    const fetch_response = await fetch(api_url); //must be async function
    const json = await fetch_response.json();
    response.json(json);
    //https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=296ba72e41ea4b8f0dbac0aba9d4295d
});


app.get('/get_hourly/:lat/:long', async (request, response) => {
    const lat = request.params.lat;
    const long = request.params.long;

    const api_url = 'https://api.openweathermap.org/data/2.5/onecall?lat=69.75&lon=-163.05&exclude=daily,current,minutely,hourly&appid=d58b653c594bd74a212616ecb531b701';
    const fetch_response = await fetch(api_url); //must be async function
    const json = await fetch_response.json();
    response.json(json);
    //https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=296ba72e41ea4b8f0dbac0aba9d4295d
});


app.get('/get_coords/:iata', async (request, response) => {
    const iata = request.params.iata;

    const api_url = 'https://airlabs.co/api/v9/flight?api_key=93609626-7660-477e-9843-380a3648f10d&flight_iata='+iata+'&_fields=lat,lng';
    const fetch_response = await fetch(api_url); //must be async function
    console.log("dddddd");
    const json = await fetch_response.json();
    response.json(json);
    //https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=296ba72e41ea4b8f0dbac0aba9d4295d
});










