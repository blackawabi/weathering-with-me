// type "npm install express"
// type "npm install body-parser"
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
    app.get('/*', (req, res, next) => {
        if (req.cookies.login == undefined) {
            res.cookie('login', 'none', { maxAge: cookieTimeOut});
            next();
        }else if(req.cookies.login == 'admin'){
            res.send('Go to admin page');
        }else if(req.cookies.login == 'user'){
            res.send('Go to user page');
        }
    });


    app.post('/login', (req, res) => {11
        User.findOne({
            username: req.body['username'],
            password: req.body['password'],
        }, (err, result) => {
            if(err){
                res.send('Here is error');
            }else if(result == null){
                res.send('Invalid username or password!');
            }else if(result.permission){
                res.cookie('login', 'admin', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to admin page');
            }else{
                res.cookie('login', 'user', { maxAge: cookieTimeOut});
                res.cookie('username', result.username);
                res.send('Go to user page');
            }
        })
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


    


    /*
    // handle requet here
    app.get('/event/:eventId', (req, res) => {
        Event.findOne({
            eventId: req.params['eventId']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] event find()' + err);
                res.status(200);
                res.send('[ERROR] Cannot execute the qurey!');
            }else if(result == null){
                console.log('[FAIL] event find()');
                res.status(404);
                res.send('[ERROR] Cannot find the event!');
            }else{
                
                Location.findOne({
                    _id: mongoose.Types.ObjectId(result.loc)
                }, (err2, result2) => {
                    let message = '';
                    message += '{<br>';
                    message += '"eventId": ' + result.eventId + ',<br>';
                    message += '"name": "' + result.name + '",<br>';

                    if(err2){
                        console.log('[FAIL] location find()' + err2);
                        message += '"loc": null<br>';
                    }else if(result2 == null){
                        console.log('[FAIL] location find()');
                        message += '"loc": null<br>';
                    }else{
                        message += '"loc":<br>';
                        message += '{<br>';
                        message += '"locId": ' + result2.locId + ',<br>';
                        message += '"name": "' + result2.name + '",<br>';
                        message += '},<br>';
                    }

                    message += '"quota": ' + result.quota + '<br>';
                    message += '}';

                    console.log('[OKAY] event find()');
                    res.status(200);
                    res.send(message);
                });
            }
        });
    });


    app.delete('/event/:eventId', (req, res) => {
        Event.deleteOne({
            eventId: req.params['eventId']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] event delete()' + err);
                res.status(404);
                res.send('[ERROR] Cannot find the event! (ID = ' + req.params['eventId'] + ' )');
            }else{
                console.log('[OKAY] event delete()');
                res.status(204);
                res.send();
            }
        });
    });


    app.get('/event', (req, res) => {
        Event.find({}, (err, results) => {
            if(err){
                console.log('[FAIL] event find()' + err);
                res.status(200);
                res.send('[ERROR] Cannot execute the qurey!');
            }else{
                let message = '[<br>';
                for(let i = 0; i <= results.length - 1; i ++){

                    Location.findOne({
                        _id: results[i].loc
                    }, (err2, result2) => {
                        message += '{<br>';
                        message += '"eventId": ' + results[i].eventId + ',<br>';
                        message += '"name": "' + results[i].name + '",<br>';

                        if(err2){
                            console.log('[FAIL] location find()' + err2);
                            message += '"loc": null<br>';
                        }else if(result2 == null){
                            console.log('[FAIL] location find()');
                            message += '"loc": null<br>';
                        }else{
                            message += '"loc":<br>';
                            message += '{<br>';
                            message += '"locId": ' + result2.locId + ',<br>';
                            message += '"name": "' + result2.name + '",<br>';
                            message += '},<br>';
                        }

                        message += '"quota": ' + results[i].quota + '<br>';
                        message += '}';

                        if(i < results.length - 1){
                            message += ',<br>';
                        }else{
                            message += '<br>]';
                            console.log('[OKAY] event find()');
                            res.status(200);
                            res.send(message);
                        }
                    });
                }
            }
        });
    });


    app.post('/event', (req, res) => {
        Location.findOne({
            locId: req.body['locId']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] location find()' + err);
                res.status(200);
                res.send('[ERROR] Cannot execute the qurey!');
            }else if(result == null){
                console.log('[FAIL] location find()');
                res.status(404);
                res.send('[ERROR] Cannot find the location! (ID = ' + req.body['locId'] + ' )');
            }else{
                
                if(req.body['quota'] > result.quota){
                    console.log('[FAIL] event meet()');
                    res.status(200);
                    res.send('[ERROR] The quota is exceeded!');
                }else{

                    let maxId = 0;
                    Event.find().sort({eventId: -1}).limit(1).exec((err2, result2) => {
                        if(err2){
                            console.log('[FAIL] event sort()' + err2);
                            res.status(200);
                            res.send('[ERROR] Cannot execute the qurey!');
                        }else{
                            if(result2 != null){
                                maxId = result2[0].eventId;
                            }
                            
                            let eventId = maxId + 1;
                            if(req.body['eventId'] != null && req.body['eventId'].length > 0){
                                eventId = req.body['eventId'];
                            }

                            Event.create({
                                eventId: eventId,
                                name:    req.body['name'],
                                loc:     result._id,
                                quota:   req.body['quota']
                            }, (err3, result3) => {
                                if(err3){
                                    console.log('[FAIL] event create()' + err3);
                                    res.status(200);
                                    res.send('[ERROR] Cannot execute the qurey!');
                                }else{
                                    console.log('[OKAY] event create()');
                                    res.location('/event/' + eventId);
                                    res.status(201);
                                    res.send(
                                        '{<br>' +
                                        '"eventId": ' + result3.eventId + ',<br>' +
                                        '"name": "' + result3.name + '",<br>' +
                                        '"loc ":<br>' +
                                        '{<br>' +
                                        '"locId": ' + result.locId + ',<br>' +
                                        '"name": "' + result.name + '",<br>' +
                                        '},<br>' +
                                        '"quota": ' + result3.quota + '<br>' +
                                        '}'
                                    );
                                }
                            });
                       }
                    });
                }
            }
        });
    });

    
    app.put('/event', (req, res) => {
        Event.findOne({
            eventId: req.query['eventId']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] event find()' + err);
                res.status(200);
                res.send('[ERROR] Cannot execute the qurey!');
            }else if(result == null){
                console.log('[FAIL] event find()');
                res.status(404);
                res.send('[ERROR] Cannot find the event! (ID = ' + req.query['eventId'] + ' )');
            }else{
                
                Location.findOne({
                    locId: req.query['locId']
                }, (err2, result2) => {
                    if(err2){
                        console.log('[FAIL] location find()' + err2);
                        res.status(200);
                        res.send('[ERROR] Cannot execute the qurey!');
                    }else if(result2 == null){
                        console.log('[FAIL] location find()');
                        res.status(404);
                        res.send('[ERROR] Cannot find the location! (ID = ' + req.query['locId'] + ' )');
                    }else{
                        
                        if(req.query['quota'] > result2.quota){
                            console.log('[FAIL] event meet()');
                            res.status(200);
                            res.send('[ERROR] The quota is exceeded!');
                        }else{
                            result.name = req.query['name'];
                            result.loc = result2._id;
                            result.quota = req.query['quota'];
                            result.save();

                            console.log('[OKAY] event update()');
                            res.location('/event/' + result.eventId);
                            res.status(201);
                            res.send(
                                '{<br>' +
                                '"eventId": ' + result.eventId + ',<br>' +
                                '"name": "' + result.name + '",<br>' +
                                '"loc ":<br>' +
                                '{<br>' +
                                '"locId": ' + result2.locId + ',<br>' +
                                '"name": "' + result2.name + '",<br>' +
                                '},<br>' +
                                '"quota": ' + result.quota + '<br>' +
                                '}'
                            );
                        }
                    }
                });
            }
        });
    });


    app.get('/loc/:locId', (req, res) => {
        Location.findOne({
            locId: req.params['locId']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] location find()' + err);
                res.status(200);
                res.send('[ERROR] Cannot execute the qurey!');
            }else if(result == null){
                console.log('[FAIL] location find()');
                res.status(404);
                res.send('[ERROR] Cannot find the location! (ID = ' + req.params['locId'] + ' )');
            }else{
                console.log('[OKAY] location find()');
                res.status(200);
                res.send(
                    '{<br>' +
                    '"locId": ' + result.locId + ',<br>' +
                    '"name": "' + result.name + '",<br>' +
                    '"quota": ' + result.quota + '<br>' +
                    '}'
                );
            }
        });
    });


    app.get('/loc', (req, res) => {
        let quota = req.query['quota']; 
        let condition = {};
        if(quota != null){
            condition = {quota: quota};
        }

        Location.find(condition, (err, results) => {
            if(err){
                console.log('[FAIL] location list()' + err);
                res.status(200);
                res.send('[ERROR] Cannot execute the qurey!');
            }else{
                let message = '[<br>';
                for(let i = 0; i <= results.length - 1; i ++){
                    message += '{<br>';
                    message += '"locId": ' + results[i].locId + ',<br>';
                    message += '"name": "' + results[i].name + '",<br>';
                    message += '"quota": ' + results[i].quota + '<br>';
                    message += '}<br>';
                    if(i < results.length - 1){
                        message += ',<br>';
                    }
                }
                message += ']';

                console.log('[OKAY] location list()');
                res.status(200);
                res.send(message);
            }
        });
    });
    

    // create location(test)
    app.post('/loc', (req, res) => {
        Location.create({
            locId: req.body['locId'],
            name:  req.body['name'],
            quota: req.body['quota']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] location create()' + err);
                res.status(200);
                res.send('[ERROR] Cannot create the location! (ID = ' + req.body['locId'] + ' )');
            }else{
                console.log('[OKAY] location create()');
                res.location('/loc/' + req.body['locId']);
                res.status(201);
                res.send(
                    '{<br>' +
                    '"locId": ' + result.locId + ',<br>' +
                    '"name": "' + result.name + '",<br>' +
                    '"quota": ' + result.quota + '<br>' +
                    '}'
                );
            }
        });
    });


    // delete location(test)
    app.get('/delloc/:locId', (req, res) => {
        Location.deleteOne({
            locId: req.params['locId']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] location delete()' + err);
                res.status(404);
                res.send('[ERROR] Cannot find the location(ID = ' + req.params['locId'] + ' )!');
            }else{
                console.log('[OKAY] location delete()');
                res.status(204);
                res.send();
            }
        });
    });
    

    // delete event(test)
    app.get('/delevent/:eventId', (req, res) => {
        Event.deleteOne({
            eventId: req.params['eventId']
        }, (err, result) => {
            if(err){
                console.log('[FAIL] event delete()' + err);
                res.status(404);
                res.send('[ERROR] Cannot find the event(ID = ' + req.params['eventId'] + ' )!');
            }else{
                console.log('[OKAY] event delete()');
                res.status(204);
                res.send();
            }
        });
    });
    */


    // handle default
    app.all('/*', (req, res) => {
        res.send('This page is not available!');
    });
});


const server = app.listen(port);
