/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

const express = require('express');
const cors = require("cors"); 
let router = express.Router();
router.use(cors());

const { User, Location } = require("../model.js");

router.post('/updateFavourite', async(req, res) => {
    if(req.cookies.username == undefined){
        res.status(401);
        res.send('Please login before adding favorite location!');
    }else{
        let countryName;
        await Location.findOne({name: req.body['locationName']}).exec()
        .then((result) => {
            countryName = result.country;
        })
        .catch((err) => {
            res.send(err);
        })

        User.findOne({
            username: req.cookies.username
        }, (err, result) => {
            if(err){
                res.send('Cannot find user!');
            }else{
                if(result.favourite.includes(countryName)){
                    let index = result.favourite.indexOf(countryName)
                    result.favourite.splice(index, 1);
                    result.save();
                    res.status(200);
                    res.send('Successfully removed favourite location');
                }else{
                    res.status(200);
                    result.favourite.push(countryName);
                    result.save();
                    res.send('Added user favourite locations');
                }
            }
        }
        );
    }
});

router.get('/getFavourite', (req, res) => {
   
    if(req.cookies.username == undefined){
        res.status(401);
        res.send('Please login first!');
    }else{
        User.findOne({
            username: req.cookies.username
        }, (err, result) => {
            if(err){
                res.send('Cannot find user!');
            }else{
                res.status(200);
                res.send(result.favourite);
            }
        });
    }
});

module.exports = router;