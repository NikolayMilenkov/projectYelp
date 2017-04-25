var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {

//    var usersCollection = req.db.get('users');
//    usersCollection.find({username: "rado", password: "rado"},{}).then(function(data) {
//        res.json(data);
//     }).catch(function(err){
//         res.json(500, err);
//     });
//     /*var usersCollection = req.db.get('users');
//     usersCollection.find({})
//     .then(function(data) {
//         res.json(data);
//     }).catch(function(err) {
//         res.json(500, err);
//     });*/

// });


router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var db = req.db;
    var users = db.get('users');
    users.find({ username: username, password: password })
        .then(function (data) {
            console.log(data);
            var bool = false;
            if (data.length > 0) {
                res.end(JSON.stringify(bool));
            } else {
                // req.session.userId = data[0]._id;
                bool = true;
                users.insert({ username: username, password: password, email: email });
                res.end(JSON.stringify(bool));
            }
        });

    /*  usersCollection.find({})
      .then(function(data) {
          res.json(data);
      }).catch(function(err) {
          res.json(500, err);
      });*/
});

module.exports = router;
