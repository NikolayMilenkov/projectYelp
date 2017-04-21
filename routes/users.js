var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   
     var usersCollection = req.db.get('users');
    usersCollection.find({})
    .then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json(500, err);
    });
});

module.exports = router;
