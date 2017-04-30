var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.post('/', function (req, res, next) {
  var restaurantCollection = req.db.get('restaurants')
  var shoppingCollection = req.db.get('shopping')
  var entertainmentCollection = req.db.get('entertainment')
  var searchResult = req.body.value
  var result = []
  var temp = "sushi";
  // /^sushi*/i
  var search = new RegExp("^" + temp + "*", 'i');
  // var regex = new RegExp("/\^" + "sushi" + "\*/")
  // restaurantCollection.find({ $or: [{ name: { $regex: '/^' + searchResult + '*/i' } }, { tag: { $regex: '/^' + searchResult + '*/i' } }] }, {})
  restaurantCollection.find({ $or: [{ name: searchResult }, { tag: { $regex: search} }] }, {})
    .then(function (data) {
      console.log(data)
      result.push(data)
      console.log(searchResult)
      console.log(result)
      res.json(data)
    }).catch(function (err) {
    res.json(500, err)
  })
})

module.exports = router
