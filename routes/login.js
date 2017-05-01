var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = sha1(req.body.password);
    var db = req.db;
    var userObjects = db.get('userObjects');
    userObjects.find({ username: username, password: password })
        .then(function (data) {
            if (data.length > 0) {
                req.session.userId = data[0]._id;
                res.end(JSON.stringify({ value: "true", user: data[0]._id }));
            } else {
                res.end(JSON.stringify({ value: "false" }));
            }
        });
});

module.exports = router;
