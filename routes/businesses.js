var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/', function (req, res, next) {
  var result = []
  var collectionRestaurants = req.db.get('restaurants')
  var collectionShopping = req.db.get('shopping')
  var collectionEntertainment = req.db.get('entertainment')
  var searchResult = req.body.value

  var search = new RegExp('/*' + searchResult + '*', 'i')
  var searchEngine = { $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }

  function populateResult (data) {
    data.forEach(function (element) {
      result.push(element)
    })
  }
  // restaurantCollection.find({ $or: [{ name: { $regex: '/^' + searchResult + '*/i' } }, { tag: { $regex: '/^' + searchResult + '*/i' } }] }, {})
  collectionRestaurants.find(searchEngine, {})
    .then(function (data) {
      populateResult(data)
      collectionShopping.find(searchEngine, {}).then(function (data) {
        populateResult(data)
        collectionEntertainment.find(searchEngine, {}).then(function (data) {
          populateResult(data);
          res.json(result);
        });
      });
    }).catch(function (err) {
    res.json(500, err)
  });
});


function getResult (dbCollection) {
    //var result = [];
    var collection = req.db.get(dbCollection)
    var searchResult = req.body.value
    // /^sushi*/i
    var search = new RegExp('/*' + searchResult + '*', 'i')
    // restaurantCollection.find({ $or: [{ name: { $regex: '/^' + searchResult + '*/i' } }, { tag: { $regex: '/^' + searchResult + '*/i' } }] }, {})
    collection.find({ $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }, {})
      .then(function (data) {
        // data.forEach(function (element) {
        //   result.push(element)
        // })
        //res.json(result)
        res.json(data);
        console.log(data);
      }).catch(function (err) {
      res.json(500, err)
    })
}
router.post('/restaurants', function (req, res, next) {
 
  getResult('restaurants');
})

router.post('/', function (req, res, next) {
  var restaurantCollection = req.db.get('restaurants')
  var shoppingCollection = req.db.get('shopping')
  var entertainmentCollection = req.db.get('entertainment')
  var searchResult = req.body.value
  var result = []
  // /^sushi*/i
  var search = new RegExp('/*' + searchResult + '*', 'i')
  // restaurantCollection.find({ $or: [{ name: { $regex: '/^' + searchResult + '*/i' } }, { tag: { $regex: '/^' + searchResult + '*/i' } }] }, {})
  restaurantCollection.find({ $or: [{ name: {$regex: search}}, { tag: { $regex: search} }] }, {})
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
