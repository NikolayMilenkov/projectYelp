var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  if (req.session.userId) {
    res.end(JSON.stringify({ value: "true", user: req.session.userId }));
  } else {
    res.end(JSON.stringify({ value: 'false' }));
  }
})

module.exports = router; 