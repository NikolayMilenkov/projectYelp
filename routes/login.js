var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.userId) {
        var db = req.db;
        var users = db.get("users");
        users.find({ _id: req.session.userId }).then(function (data){
            console.log("skivai kvo namerih" + data);
            res.end(JSON.stringify({data}));
        })
    }
    else {
        res.status(401).send("errorMsg")
    };
});

module.exports = router;
