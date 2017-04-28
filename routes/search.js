var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  var db = req.db;
  var businessesCollection = db.get('businesses');
  var searchItem = req.body.search;
  // do something with search item string if needed
  businessesCollection.find({ businessesName: { $regex: "searchItem", $options: "$i" } });
})
module.exports = router;