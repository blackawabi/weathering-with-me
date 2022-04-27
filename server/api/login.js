


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