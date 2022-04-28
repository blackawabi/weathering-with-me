// type "npm install express"
// type "npm install body-parser"
// type "npm install cookie-parse"
// type "npm install mongoose"

const port = 3000;
const cookieTimeOut = 1200000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let account = require("./api/account.js");
let comment = require("./api/comment.js");
let location = require("./api/location.js");
let login = require("./api/login.js");
let user = require("./api/user.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(account);
app.use(comment);
app.use(location);
app.use(login);
app.use(user);

const mongoose = require('mongoose');
const { triggerAsyncId } = require('async_hooks');
mongoose.connect('mongodb+srv://stu150:p351885-@csci2720.m2qbq.mongodb.net/stu150');
const db = mongoose.connection;



// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log('Connection is open...');



    app.get('/favorite', (req, res) => {
        if(req.cookies.username == undefined){
            res.send('Please login before viewing favorite location!');
        }else{
            User.findOne({
                username: req.cookies.username
            }, (err, result) => {
                if(err){
                    res.send('Cannot execute the qurey!');
                }else{
                    res.send(JSON.stringify(result.favorite));
                }
            });
        }
    });


    app.get('/favorite/update', (req, res) => {
        if(req.cookies.username == undefined){
            res.send('Please login before adding favorite location!');
        }else{
            User.findOne({
                username: req.cookies.username
            }, (err, result) => {
                if(err){
                    res.send('Cannot execute the qurey!');
                }else{
                    result.favorite = JSON.parse(req.body['favorite']);
                    result.save();
                    res.send('update new favorite location!');
                }
            });
        }
    });


    app.get('/profile', () => {
        if(req.cookies.username == undefined){
            res.send('Please login before viewing profile!');
        }else{
            User.findOne({
                username: req.cookies.username
            }, (err, result) => {
                if(err){
                    res.send('Cannot execute the qurey!');
                }else{
                    res.send(result);
                }
            });
        }
    })

    app.get('/comment', (req, res) => {
        Comment.find({}, (err, results) => {
            if(err){
                res.send('Cannot execute the qurey!');
            }else{
                res.json(results);
            }
        });
    });


    app.post('/comment/new', (req, res) => {
        if(req.cookies.username == undefined){
            res.send('Please login before adding comment!');
        }else{
            Comment.find().sort({eventId: -1}).exec((err, results) => {
                if(err){
                    res.send('Cannot execute the qurey!');
                }else{
                    let maxID = results[0].commentID;
    
                    Comment.create({
                        commentID: maxID + 1,
                        username: req.cookies.username,
                        content: req.body['content']
                    }, (err2, result2) => {
                        if(err2){
                            res.send('Cannot execute the qurey!');
                        }else{
                            res.send('create a new comment!');
                        }
                    });
                }
            });
        }
    });


    app.get('/comment/del/:commentID', (req, res) => {
        Comment.deleteOne({
            commentID: req.params['commentID']
        }, (err, result) => {
            if(err){
                res.send('Cannot execute the qurey!');
            }else{
                res.send('delete a comment!');
            }
        });
    });


    // Shutdown
    app.all('/shutdown', (req, res) => {
        setTimeout(() => {
            app.close();
        }, 3000);
    });
    

    app.use(express.static('public'));


    // handle default
    app.all('/*', (req, res) => {
        res.send('This page is not available!');
    });
});


const server = app.listen(port);
