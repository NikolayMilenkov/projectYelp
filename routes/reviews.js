var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var objectId = req.body.objectId;
    var userId = req.body.userId;
    var collection = req.body.collection;
    var text = req.body.text;
    var db = req.db;
    var author = "";
    var userObjects = db.get('userObjects');
    var objCollection = db.get(collection);
    userObjects.find({ _id: userId }).then(function (data) {
        if (data.length > 0) {
            author = data[0].username;
            objCollection.update({ _id: objectId }, { $push: { reviews: { text, author: author } } }).then
                (function (data) {
                    res.end(JSON.stringify({ value: "true" }));
                }, function (err) {
                }).catch(function (err) {
                    res.json(500, err)
                })
        } else {
            res.end(JSON.stringify({ value: "false" }))
        }
    }).catch(function (err) {
        res.json(500, err);
    })
});

module.exports = router;