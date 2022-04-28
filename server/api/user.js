const express = require('express');
const cors = require("cors"); 
let router = express.Router();
router.use(cors());

const { User } = require("../model.js");

router.post('/addFavourite', (req, res) => {
    if(req.cookies.username == undefined){
        res.send('Please login before adding favorite location!');
    }else{
        User.findOne({
            username: req.cookies.username
        }, (err, result) => {
            if(err){
                res.send('Cannot find user!');
            }else{
                res.status(200);
                result.favourite.push(req.body['locationName']);
                result.save();
                res.send('Updated user favourite locations');
            }
        }
        );
    }
});

router.get('/getFavourite', (req, res) => {
    if(req.cookies.username == undefined){
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