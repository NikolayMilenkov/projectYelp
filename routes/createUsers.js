var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

// new user consructor
function UserObject(username, email, type) {
    this.username = username;
    this.email = email;
    this.type = type;
};

function User(username, password) {
    this.username = username;
    this.password = password;
}

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = sha1(req.body.password);
    var email = req.body.email;
    var type = req.body.type;
    var newUser = new UserObject(username, email, type);
    var newUserObject = new User(username, password);
    var db = req.db;
    var users = db.get('users');
    var userObjects = db.get('userObjects');
    var theId = "";
    users.find({ username: username })
        .then(function (data) {
            if (data.length > 0) {
                res.end(JSON.stringify({ value: "false" }));
            } else {
                users.find({ email: email }).then(function (data) {
                    if (data.length > 0) {
                        res.end(JSON.stringify({ value: "false" }));
                    } else {
                        userObjects.insert(newUserObject).then(function (data) {
                            userObjects.find(newUserObject).then(function (result) {
                                theId = result[0]._id;
                                req.session.userId = result[0]._id;
                                users.insert(newUser).then(function () {
                                    res.end(JSON.stringify({ value: "true", user: theId }));
                                });
                            });
                        });
                    }
                });
            }
        });
});

module.exports = router;
