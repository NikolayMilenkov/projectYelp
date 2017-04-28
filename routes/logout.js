var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (req.session.userId) {
    req.session.destroy()
    res.end(JSON.stringify({ value: "true" }));
  } else {
    res.end(JSON.stringify({ value: "false" }))
  }
});

module.exports = router;