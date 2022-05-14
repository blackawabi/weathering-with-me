/*
1155125519 Hon Wing Ngai	1155143564 Chiu Chak San	1155126052 Kong Ho Pak 
1155136412 Pau Chun Wai	    1155143814 Lam Tsz Hoi	
*/

const express = require('express');
const cors = require("cors"); 
let router = express.Router();
router.use(cors());

const { Comment, Location } = require("../model.js");

router.post('/addComment', (req, res) => {
    if(req.cookies.username == undefined){
        res.send('Please login before adding favorite location!');
    }else{
        Location.findOne({
            name: req.body['locationName']
        }, (errLoc, resLoc) => {
            if(errLoc){
                res.status(401);
                res.send(errLoc);
            }else{
                if(resLoc == null){
                    res.status(401);
                    res.send('No such location');
                }else{
                    Comment.create({
                        content: req.body['comment'],
                        username: req.cookies.username,
                    }, (err, result) => {
                        if(err){
                            res.status(401);
                            res.send(err);
                        }else{
                            console.log(resLoc);
                            resLoc.commentList.push(result);
                            resLoc.save()
                            res.status(201);
                            res.send('Successfully created comment');
                        }
                    });
                }
            }
        });
    }
});

/*
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
*/

module.exports = router;