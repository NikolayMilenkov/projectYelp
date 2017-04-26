var express = require('express');
var router = express.Router();

// GET home page. 
router.get('/', function(req, res, next) {
  req.session.destroy();
});

router.post('/',function(req, res, next){
    // var usersCollection = req.db.get('businesses');
    
})
module.exports = router;