const { User } = require("../model.js");

const express = require('express');
const router = express.Router();
const cors = require("cors");
router.use(cors());

// handle request here
// create a user
router.post('/account', (req, res) => {
    let permission = false;
    if(req.body['permission'] == 'true'){
        permission = true;
    }
    
    User.create({
        username: req.body['username'],
        password: req.body['password'],
        permission: permission,
        favorite: []
    }, (err, result) => {
        if(err){
            res.status(401);
            console.log(err);
            res.send('Username already exists');
        }else{
            res.status(201);
            res.send('Account created successfully');
            console.log("created successfully")
        }
    });
});


// get all user information
router.get('/accounts', (req, res) => {
    if(req.cookies.permission != 'true'){
        res.status(403);
        res.send('Permission denied');
    }else{
        User.find({}, (err, results) => {
            if(err){
                res.status(500);
                res.send('Server error occurred');
            }else{
                res.status(200);
                res.send(results);
            }
        });
    }
});


// get information of a user
router.get('/account', (req, res) => {
    User.findOne({
        username: req.query['username']
    }, (err, result) => {
        if(err){
            res.status(500);
            res.send('Server error occurred');
        }else{
            if(result == null){
                res.status(401);
                res.send('Invalid username');
            }else{
                res.status(200);
                res.send(result);
            }
        }
    });
});


// update account
router.put('/account', (req, res) => {
    User.findOneAndUpdate({
        username: req.body['original_username']
    }, {
        username: req.body['new_username'],
        password: req.body['new_password']
    }, (err, result) => {
        if(err){
            res.status(401);
            res.send('New username already exists/ username not found');
        }else{
            res.status(200);
            res.send('Updated successfully');
        }
    });
});


// delete account
router.delete('/account', (req, res) => {
    User.findOneAndDelete({
        username: req.body['username']
    }, (err, result) => {
        if(err){
            res.status(401);
            res.send('Invalid username');
        }else{
            res.status(200);
            res.send('Deleted successfully');
        }
    });
});


// delete all users (warning)
router.get('/account/init', (req, res) => {
    // reset index in DB (debug only) // User.syncIndexes();

    User.deleteMany({}, (err, results) => {
        if(err){
            res.status(500);
            res.send('Server error occurred');
        }else{
            res.status(200);
            res.send('Initial successfully');
        }
    });
});

module.exports = router;
