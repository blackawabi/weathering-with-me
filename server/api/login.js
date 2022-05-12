const express = require('express');
const cors = require("cors"); 
const p4ssw0rd = require("p4ssw0rd")
let router = express.Router();
router.use(cors());

const { User } = require("../model.js");


const cookieTimeOut = 1200000;
// login to the system
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body['username'],
    }, (err, result) => {
        if(err){
            res.status(500);
            res.send('Server error occurred');
        }else if(p4ssw0rd.check(req.body["password"],result.password,{cost:10})){
            res.cookie('username', result.username, { maxAge: cookieTimeOut});
            res.cookie('password', result.password, { maxAge: cookieTimeOut});
            res.cookie('permission', result.permission, { maxAge: cookieTimeOut});
            res.status(200);
            res.send('Login successfully');
        }else{
            res.status(401);
            res.send('Invalid username or password');
        }
    });
});


// logout
router.get('/logout', (req, res) => {

    //easy for testing
    //res.setHeader('Access-Control-Allow-Credentials', true);
    //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //easy for testing
    res.cookie('username', '', { maxAge: -1});
    res.cookie('password', '', { maxAge: -1});
    res.cookie('permission', '', { maxAge: -1});
    res.status(200);
    res.send('Logout successfully');
});

module.exports = router;
