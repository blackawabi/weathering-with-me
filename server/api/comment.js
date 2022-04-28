const express = require('express');
const cors = require("cors"); 
let router = express.Router();
router.use(cors());

const { Comment, Location } = require("../model.js");

router.post('/addComment', (req, res) => {
    if(req.cookies.username == undefined){
        res.send('Please login before adding favorite location!');
    }else{
        Comment.create({
            content: req.body['comment'],
            username: req.cookies.username,
        }, (err, result) => {
            if(err){
                res.status(401);
                res.send(err);
            }else{
                Location.findOne({
                    name: req.body['locationName']
                }, (errLoc, resLoc) => {
                    if(errLoc){
                        res.status(401);
                        res.send(errLoc);
                    }else{
                        resLoc.commentList.push(result);
                        resLoc.save()
                        res.status(201);
                        res.send('Successfully created comment');
                    }
                });
            }
        });
    }
});

module.exports = router;