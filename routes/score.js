var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var objectId = req.body.objectId;
    var collection = req.body.collection;
    var score = parseInt(req.body.score);
    var db = req.db;
    var objCollection = db.get(collection);

    objCollection.update({ _id: objectId }, { $push: { rating: score } }).then(function(data) {
        res.end(JSON.stringify({ value: "true" }));
    }, function(err) {}).catch(function(err) {
        res.json(500, err);
    }).catch(function(err) {
        res.json(500, err);
    });
});

module.exports = router;