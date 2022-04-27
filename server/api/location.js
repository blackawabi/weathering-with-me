const express = require('express');
const app = express();
const fetch = require('node-fetch')


let Location = require("../model.js");

const weatherAPI_key = '1d4b5bca7db7453cb6d121603222704';
const weatherAPI_url = 'https://api.weatherapi.com/v1/current.json?key=' + weatherAPI_key;

app.post('/location', async(req, res) => {
    let locationName = req.body['name'];
    let req_lat = req.body['lat'];
    let req_long = req.body['long'];
    let res_country, res_temp_c, res_wind_kph, res_wind_dir, res_precip_mm, res_humidity, res_vis_km;
    let findLocation;
    if(req.cookies.permission != true){
        res.status(403);
        res.send('Permission denied');
    }else{
        await Location.findOne({name: locationName}).exec()
        .then((result) => {
            findLocation = result;
        })
        .catch((err) => {
            res.send(err);
        })

        // check if have existing location
        if(findLocation != null){
            res.status(401);
            res.send('Location already exists');
        }else{
            let url = weatherAPI_url + '&q=' + req_lat + ',' + req_long + '&aqi=no';
            await fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        res_country = res['location']['country'];
                        res_temp_c = res['current']['temp_c'];
                        res_wind_kph = res['current']['wind_kph'];
                        res_wind_dir = res['current']['wind_dir'];
                        res_precip_mm = res['current']['precip_mm'];
                        res_humidity = res['current']['humidity'];
                        res_vis_km = res['current']['vis_km'];
                    })
            Location.create({
                name: locationName,
                country: res_country,
                lat: req_lat,
                long: req_long,
                time: new Date(),
                commentList: [],
                temp_c: res_temp_c,
                wind_kph: res_wind_kph,
                wind_dir: res_wind_dir,
                humidity: res_humidity,
                precip_mm: res_precip_mm,
                vis_km: res_vis_km,
            }, (err, result) => {
                if(err){
                    res.status(401);
                    res.send(err);
                }else{
                    res.status(201);
                    res.send('Succesfully created location');
                }
            });
        }
    }
});

app.get('/locations', async(req,res) => {
    if(req.cookies.permission != true){
        res.status(403);
        res.send('Permission denied');
    }else{
        let url;
        await Location.find().exec()
        .then((results) => {
            for(const doc of results){
                url = weatherAPI_url + '&q=' + doc.lat + ',' + doc.long + '&aqi=no';
                await fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        doc.country = res['location']['country'];
                        doc.temp_c = res['current']['temp_c'];
                        doc.wind_kph = res['current']['wind_kph'];
                        doc.wind_dir = res['current']['wind_dir'];
                        doc.precip_mm = res['current']['precip_mm'];
                        doc.humidity = res['current']['humidity'];
                        doc.vis_km = res['current']['vis_km'];
                        doc.save();
                    })
            }
            res.status(200);
            res.send(results);
        })
        .catch((err) => {
            res.send(err);
        })
    }
});

app.get('/location', async(req,res) => {
    if(req.cookies.permission != true){
        res.status(403);
        res.send('Permission denied');
    }else{
        let url;
        await Location.findOne({ name: req.body['name']}).exec()
        .then((result) => {
            url = weatherAPI_url + '&q=' + result.lat + ',' + result.long + '&aqi=no';
            await fetch(url)
                .then(res => res.json())
                .then(res => {
                    result.country = res['location']['country'];
                    result.temp_c = res['current']['temp_c'];
                    result.wind_kph = res['current']['wind_kph'];
                    result.wind_dir = res['current']['wind_dir'];
                    result.precip_mm = res['current']['precip_mm'];
                    result.humidity = res['current']['humidity'];
                    result.vis_km = res['current']['vis_km'];
                    result.save();
                    })
            res.status(200);
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
    }
});