var express = require('express')
var router = express.Router()
// router.use(function(req, res, next){
//    res.invalidInput = function() {
//         return res.status(400).json({"error": "Invalid input"})
//     }
//     next()
// })
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

function populateResult (data,array) {
  data.forEach(function (element) {
    array.push(element)
  })
}

router.post('/', function (req, res, next) {
  var result = []
  var collectionRestaurants = req.db.get('restaurants')
  var collectionShopping = req.db.get('shopping')
  var collectionEntertainment = req.db.get('entertainment')
  var searchResult = req.body.value

  var search = new RegExp('/*' + searchResult + '/*', 'i')
  var searchEngine = { $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }
  collectionRestaurants.find(searchEngine, {})
    .then(function (data) {
      populateResult(data,result)
      collectionShopping.find(searchEngine, {}).then(function (data) {
        populateResult(data,result)
        collectionEntertainment.find(searchEngine, {}).then(function (data) {
          populateResult(data,result)
          res.json(result)
        })
      })
    }).catch(function (err) {
    res.json(500, err)
  })
})

router.post('/rest&shop', function (req, res, next) {
  var result = []
  var collectionRestaurants = req.db.get('restaurants')
  var collectionShopping = req.db.get('shopping')
  var searchResult = req.body.value

  var search = new RegExp('/*' + searchResult + '/*', 'i')
  var searchEngine = { $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }

  collectionRestaurants.find(searchEngine, {})
    .then(function (data) {
      populateResult(data,result);
      collectionShopping.find(searchEngine, {}).then(function (data) {
        populateResult(data,result);
        res.json(result);
      })
    }).catch(function (err) {
    res.json(500, err);
  });
});

router.post('/rest&enter', function (req, res, next) {
  var result = []
  var collectionRestaurants = req.db.get('restaurants')
  var collectionEntertainment = req.db.get('entertainment')
  var searchResult = req.body.value

  var search = new RegExp('/*' + searchResult + '/*', 'i')
  var searchEngine = { $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }

  collectionRestaurants.find(searchEngine, {})
    .then(function (data) {
      populateResult(data,result)
      collectionEntertainment.find(searchEngine, {}).then(function (data) {
        populateResult(data,result)
        res.json(result);
      })
    }).catch(function (err) {
    res.json(500, err);
  });
});

router.post('/shop&enter', function (req, res, next) {
  var result = []
  var collectionShopping = req.db.get('shopping')
  var collectionEntertainment = req.db.get('entertainment')
  var searchResult = req.body.value

  var search = new RegExp('/*' + searchResult + '/*', 'i')
  var searchEngine = { $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }

  collectionShopping.find(searchEngine, {})
    .then(function (data) {
      populateResult(data,result)
      collectionEntertainment.find(searchEngine, {}).then(function (data) {
        populateResult(data,result)
        res.json(result);
      })
    }).catch(function (err) {
    res.json(500, err);
  });
});

router.post('/restaurants', function (req, res, next) {
  var result = []
  var restaurantsCollection = req.db.get('restaurants')
  var searchResult = req.body.value
  var search = new RegExp('/*' + searchResult + '/*', 'i')
  restaurantsCollection.find({ $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }, {})
    .then(function (data) {
      data.forEach(function (element) {
        result.push(element)
      })
      res.json(result)
    }).catch(function (err) {
    res.json(500, err)
  })
})
router.post('/shopping', function (req, res, next) {
  var result = []
  var shoppingCollection = req.db.get('shopping')
  var searchResult = req.body.value
  var search = new RegExp('/*' + searchResult + '/*', 'i')
  shoppingCollection.find({ $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }, {})
    .then(function (data) {
      data.forEach(function (element) {
        result.push(element)
      })
      res.json(result)
    }).catch(function (err) {
    res.json(500, err)
  })
})
router.post('/entertainment', function (req, res, next) {
  var result = []
  var entertainmentCollection = req.db.get('entertainment');
  var searchResult = req.body.value;
  console.log("searchenter " + searchResult);
  var search = new RegExp('/*' + searchResult + '/*', 'i');
  console.log("search " + search);
  entertainmentCollection.find({ $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }, {})
    .then(function (data) {
      data.forEach(function (element) {
        result.push(element)
      })
      res.json(result)
    }).catch(function (err) {
    res.json(500, err)
  })
})
// router.post('/shopping', function (req, res, next) {
//   getResult('shopping')
// })
// router.post('/entertainment', function (req, res, next) {
//   getResult('entertainment')
// })

// function getResult (dbCollection) {
//     console.log(req.body.value)
//     var result = []
//     var collection = req.db.get(dbCollection)
//     // console.log(collection)
//     var searchResult = req.body.value

//     // /^sushi*/i
//     var search = new RegExp('/*' + searchResult + '*', 'i')
//     // restaurantCollection.find({ $or: [{ name: { $regex: '/^' + searchResult + '*/i' } }, { tag: { $regex: '/^' + searchResult + '*/i' } }] }, {})
//     collection.find({ $or: [{ name: { $regex: search } }, { tag: { $regex: search } }] }, {})
//       .then(function (data) {
//         data.forEach(function (element) {
//           result.push(element)
//         })
//         res.json(result)
//         console.log(result)
//       }).catch(function (err) {
//       res.json(500, err)
//     })
//   }

module.exports = router
