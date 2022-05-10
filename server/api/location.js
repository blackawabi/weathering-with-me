const express = require('express');
const cors = require("cors"); 
let router = express.Router();
router.use(cors());
const fetch = require('node-fetch')
const google_images = require("free-google-images");

const { Location } = require("../model.js");
const { RouteTwoTone } = require('@mui/icons-material');

const weatherAPI_key = '1d4b5bca7db7453cb6d121603222704';
const weatherAPI_url = 'https://api.weatherapi.com/v1/current.json?key=' + weatherAPI_key;

router.get("/background",async(req,res)=>{
    let date=new Date();
    let query;
    /*
    if (date.getHours()>=4 && date.getHours()<11)
        query=req.query["country"]+" city view morning"
    else if(date.getHours()>=11 && date.getHours()<18)
        query=req.query["country"]+" city view noon"
    else query=req.query["country"]+" city view night"*/
    query=req.query["country"]+" city view"
    google_images.search(query,true)
    .then(result => {
            for(let i=0;i<result.length;i++){
                if(result[i].image.size.width>=1280){
                    res.send(result[i].image.url)
                    console.log(result[i].image.url)
                    break;
                }
                
            }        
    }).catch(err=>console.log(err))
})

router.post('/location', async(req, res) => {
    let locationName = req.body['name'];
    let req_lat = req.body['lat'];
    let req_long = req.body['long'];
    let res_country, res_temp_c, res_wind_kph, res_wind_dir, res_precip_mm, res_humidity, res_vis_km;
    let findLocation;
    //if(req.cookies.permission != 'true'){
    //    res.status(403);
    //    res.send('Permission denied');
    //}else{
        await Location.findOne({name: locationName}).exec()
        .then((result) => {
            findLocation = result;
        })
        .catch((err) => {
            res.send(err);
        })
        let fetch_success = true;
        let url = weatherAPI_url + '&q=' + req_lat + ',' + req_long + '&aqi=no';
        try{
            await fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                res_country = res['location']['country'];
                res_temp_c = res['current']['temp_c'];
                res_wind_kph = res['current']['wind_kph'];
                res_wind_dir = res['current']['wind_dir'];
                res_precip_mm = res['current']['precip_mm'];
                res_humidity = res['current']['humidity'];
                res_vis_km = res['current']['vis_km'];
            })
        }
        catch(e){
            res.status(401);
            res.send('Cant fetch from weather API');
            console.log("Cant fetch");
            fetch_success = false
        }

        // check if have existing location
        if(fetch_success){
            if(findLocation != null){
                res.status(401);
                res.send('Location already exists');
            }else{
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
                        console.log(err);
                    }else{
                        res.status(201);
                        res.send('Succesfully created location');
                    }
                });
            }
        }
    //}
});

router.get('/locations', async(req,res) => {
    /*
    if(req.cookies.permission != 'true'){
        res.status(403);
        res.send('Permission denied');
    }else{
        */
        let locationList, url;
        await Location.find().exec()
        .then((results) => {
            locationList = results;
        })
        .catch((err) => {
            res.send(err);
        })

        for(const doc of locationList){
            url = weatherAPI_url + '&q=' + doc.lat + ',' + doc.long + '&aqi=no';
            try{
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
                    console.log(doc.updatedAt);
                    console.log('all done');
                })
            }
            catch(e){
                console.log(e);
            }
        }
            res.status(200);
            res.send(locationList);
     //   }
});

router.get('/location', async(req,res) => {
    /*if(req.cookies.permission != 'true'){
        res.status(403);
        res.send('Permission denied');
    }else{*/
        let url, result, result_lat, result_long;
        let exists = true;
        await Location.findOne({ name: req.query['name']}).exec()
        .then((q_result) => {
            if(q_result == null){
                res.status(401);
                res.send('No such location');
                exists = false;
            }else{
                result = q_result;
                result_lat = q_result.lat;
                result_long = q_result.long;
                console.log(result);
            }
            
        })
        .catch((err) => {
            res.send(err);
        })

        if(exists){
            url = weatherAPI_url + '&q=' + result.lat + ',' + result.long + '&aqi=no';
            try{
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
                    console.log('done');
                    })
            }
            catch(e){
                console.log(e)
            }
                res.status(200);
                res.send(result);
            }
     //   }
});

router.put('/location', async(req, res) => {
   // if(req.cookies.permission != 'true'){
   //     res.status(403);
   //     res.send('Permission denied');
   // }else{
        await Location.findOne({name: req.body['new_locationName']}).exec()
        .then((result) => {
            findLocation = result;
        })
        .catch((err) => {
            res.send(err);
        })

        if(findLocation != null){
            res.status(401);
            res.send('Location name already exists');
        }else{
            Location.findOne({name: req.body['original_locationName']}, (err, result) => {
                if(err){
                    res.status(401);
                    res.send(err);
                }else{
                    result.name = req.body['new_locationName'];
                    result.lat = req.body['lat'];
                    result.long = req.body['long'];
                    result.save();
                    res.status(200);
                    res.send('Updated location successfully');
                }
            });
        }
    //}
});

router.delete('/location', (req, res) => {
    //if(req.cookies.permission != 'true'){
    //    res.status(403);
    //    res.send('Permission denied');
    //}else{
        Location.findOneAndDelete({name: req.body['locationName']}, (err, result) => {
            if(err){
                res.status(401);
                res.send(err);
            }else{
                res.status(204);
                res.send('Deleted location successfully');
            }
        })
    //}
})

module.exports = router;