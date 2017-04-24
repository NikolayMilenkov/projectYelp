var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('cors problem fixed:)');
});
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
router.post('/', function(req, res, next) {
   res = req.body;
   
  /*  usersCollection.find({})
    .then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json(500, err);
    });*/
});

module.exports = router;
