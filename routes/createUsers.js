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


function CreateUser(username, password, email, type) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.type = type;
};

router.post('/', function (req, res, next) {
    console.log(req.body);
    //console.log(newUser);
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var type = req.body.type;
    var newUser = new CreateUser(username, password, email, type)
    var db = req.db;
    var users = db.get('users');

    users.find({ username: username })
        .then(function (data) {
            console.log(data);
            
            if (data.length > 0) {
                res.end(JSON.stringify({value: "false"}));
            } else {
                users.find({ email: email }).then(function (data) {
                    console.log("user = " + newUser);
                    if (data.length > 0) {
                        res.end(JSON.stringify({value: "false"}));
                    } else {
                    
                        users.insert(newUser);
                        res.end(JSON.stringify({value: "true"}));
                        // req.session.userId = data[0]._id;
                    }
                });
            }
            
        });

});
        

    /*  usersCollection.find({})
      .then(function(data) {
          res.json(data);
      }).catch(function(err) {
          res.json(500, err);
      });*/


module.exports = router;
