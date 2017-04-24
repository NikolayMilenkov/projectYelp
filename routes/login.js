var express = require('express');
var router = express.Router();

//GET home page. 
/*
router.get('/', function (req, res, next) {
    if (req.session.username)
        res.redirect('/');
    else
        res.render('login');
});

router.post('/', function (req, res, next) {
    var user = JSON.parse(req.body);
    var username = user.username;
    var password = user.password;
    var db = req.db;
    var users = db.get('users');
    users.find({ username: username, pass: password })
        .then(function (data) {
            if (data.length > 0) {
                req.session.userId = data[0]._id;
                res.redirect('/');
            } else {
                res.render('login', { message: 'Incorrect username and password'});
            }
        });
});
module.exports = router;
*/