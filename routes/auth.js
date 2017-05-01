var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  if (req.session.userId) {
    var db = req.db;
    var userObjects = db.get('userObjects');
    userObjects.find({ _id: req.session.userId }).then(function (data) {
      if (data.length > 0) {
        res.end(JSON.stringify({ value: 'true' }));
      }
    });
  } else {
    res.end(JSON.stringify({ value: 'false' }));
  }
})

module.exports = router;