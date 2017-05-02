var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

router.post('/', function (req, res, next) {
    var password = sha1(req.body.password);
    var userId = req.body.userId;
    var db = req.db;
    var userObjects = db.get('userObjects');
    userObjects.find({ _id: userId })
        .then(function (data) {
            if (data.length > 0) {
                if (data[0].password == password) {
                    res.end(JSON.stringify({ value: "true" }));
                } else {
                    res.end(JSON.stringify({ value: "false" }));
                }
            } else {
                res.end(JSON.stringify({ value: "false" }));
            }
        }, function (responce) {
            res.end(JSON.stringify({ value: "false" }));
        });
});

router.post('/newUser', function (req, res, next) {
    var username = req.body.username;
    var userId = req.body.userId;
    var db = req.db;
    var userObjects = db.get('userObjects');
    var users = db.get("users");
    var oldUsername = "";
    userObjects.find({ _id: userId })
        .then(function (data) {
            if (data.length > 0) {
                oldUsername = data[0].username;
                userObjects.update({ username: oldUsername }, { $set: { username: username } }).then(function (data) {
                    users.update({ username: oldUsername }, { $set: { username: username } }).then(function (data) {
                        res.end(JSON.stringify({ value: "true" }));
                    });
                });
            } else {
                res.end(JSON.stringify({ value: "false" }));
            }
        });
});

router.post('/newPass', function (req, res, next) {
    var password = sha1(req.body.password);
    var userId = req.body.userId;
    var db = req.db;
    var userObjects = db.get('userObjects');
    var users = db.get("users");
    var oldUsername = "";
    userObjects.find({ _id: userId })
        .then(function (data) {
            if (data.length > 0) {
                oldUsername = data[0].username;
                userObjects.update({ username: oldUsername }, { $set: { password: password } }).then(function (data) {
                    res.end(JSON.stringify({ value: "true" }));
                });
            } else {
                res.end(JSON.stringify({ value: "false" }));
            }
        });
});

router.post('/newEmail', function (req, res, next) {
    var email = req.body.email;
    var userId = req.body.userId;
    var db = req.db;
    var userObjects = db.get('userObjects');
    var users = db.get("users");
    var oldUsername = "";
    userObjects.find({ _id: userId })
        .then(function (data) {
            if (data.length > 0) {
                oldUsername = data[0].username;
                users.update({ username: oldUsername }, { $set: { email: email } }).then(function (data) {
                    res.end(JSON.stringify({ value: "true" }))
                }).catch(function (err) {
                    res.json(500, err);
                });
            } else {
                res.end(JSON.stringify({ value: "false" }));
            }
        });
});

module.exports = router;
