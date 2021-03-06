/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/


// type "npm install express"
// type "npm install body-parser"
// type "npm install cookie-parser"
// type "npm install mongoose"

const port = 4000;
// const cookieTimeOut = 1200000;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
let account = require("./api/account.js");
let comment = require("./api/comment.js");
let location = require("./api/location.js");
let login = require("./api/login.js");
let user = require("./api/user.js");



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());
app.use(account);
app.use(comment);
app.use(location);
app.use(login);
app.use(user);
app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static('public'));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

const mongoose = require('mongoose');
const { triggerAsyncId } = require('async_hooks');
mongoose.connect('mongodb+srv://stu056:p439706-@csci2720.6hfif.mongodb.net/stu056');
const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log('Connection is open...');

    // Shutdown
    app.all('/shutdown', (req, res) => {
        setTimeout(() => {
            app.close();
        }, 3000);
    });
    
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, "../build/index.html"));
    });
    
    // handle default
    app.all('/*', (req, res) => {
        res.send('This page is not available!');
    });
});

const server = app.listen(port);
