// type "npm install express"
// type "npm install body-parser"
// type "npm install cookie-parse"
// type "npm install mongoose"

const port = 3000;
const cookieTimeOut = 1200000;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');
const { triggerAsyncId } = require('async_hooks');
mongoose.connect('mongodb+srv://stu150:p351885-@csci2720.m2qbq.mongodb.net/stu150');
const db = mongoose.connection;


// create schema
const UserSchema = mongoose.Schema({
    username: {type: String, require: true, unique: ture},
    password: {type: String, require: true},
    permission: {type: Boolean, require: true},
    favorite: [{
        location: {type: String}
    }]
});
const User = mongoose.model('User', UserSchema);

const CommentSchema = mongoose.Schema({
    commentID: {type: Number, require: true, unique: ture},
    username: {type: String},
    content: {type: String}
});
const Comment = mongoose.model('Comment', CommentSchema);


// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log('Connection is open...');


    // handle request here
    // create a user
    app.post('/account', (req, res) => {
        User.create({
            username: req.body['username'],
            password: req.body['password'],
            permission: false,
            favorite: []
        }, (err, result) => {
            if(err){
                res.status(401);
                res.send('Username already exists');
            }else{
                res.status(201);
                res.send('Account created successfully')
            }
        });
    });


    // get all user information
    app.get('/accounts', (req, res) => {
        if(req.cookies.permission != true){
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
    app.get('/account', (req, res) => {
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
    app.put('/account', (req, res) => {
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
    app.delete('/account', (req, res) => {
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


    // login to the system
    app.post('/login', (req, res) => {
        User.findOne({
            username: req.body['username'],
            password: req.body['password'],
        }, (err, result) => {
            if(err){
                res.status(500);
                res.send('Server error occurred');
            }else if(result == null){
                res.status(401);
                res.send('Invalid username or password');
            }else{
                res.cookie('username', result.username, { maxAge: cookieTimeOut});
                res.cookie('password', result.password, { maxAge: cookieTimeOut});
                res.cookie('permission', result.permission, { maxAge: cookieTimeOut});
                res.status(200);
                res.send('Login successfully');
            }
        })
    });


    // logout
    app.get('/logout', (req, res) => {
        res.cookie('username', '', { maxAge: -1});
        res.cookie('password', '', { maxAge: -1});
        res.cookie('permission', '', { maxAge: -1});
        res.status(200);
        res.send('Logout successfully');
    });


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
