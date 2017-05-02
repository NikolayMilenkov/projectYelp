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
        console.log("review zaqvka otvorena");
        if (data.length > 0) {
            console.log(objectId);
            author = data[0].username;
            objCollection.update({ _id: objectId }, { $push: { reviews: { text, author: author } } }).then
            (function (data) {
                console.log("updatenah");
                res.end(JSON.stringify({ value: "true" }));
            }, function (err) { 
                console.log("ebahme se");
                console.log(err);
            }).catch(function () { });
        } else {
            res.end(JSON.stringify({ value: "false" }))
        }
    }, function () { }).catch(function () { });
});

module.exports = router;