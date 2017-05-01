var express = require('express')
var router = express.Router()
var sha1 = require('sha1')
/* GET users listing. */

router.get('/', function (req, res, next) {
  if (req.session.userId) {
    var db = req.db
    var users = db.get('users')
    users.find({ _id: req.session.userId }).then(function (data) {
      if (data.length > 0) {
        console.log('skivai kvo namerih' + data)
      }
    })

    res.end()
    res.end(JSON.stringify({value: 'true'}))
  }else {
    res.end(JSON.stringify({value: 'false'}))
  }
})

module.exports = router
