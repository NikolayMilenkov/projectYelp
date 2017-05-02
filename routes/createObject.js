var express = require('express');
var router = express.Router();

function Obj(name, address, tag, phone, image, description, type) {
  this.name = name;
  this.address = address;
  this.tag = tag;
  this.phone = phone;
  this.image = image;
  this.description = description;
  this.rating = [0];
  this.type = type;
  this.reviews = [];
}

router.post('/', function (req, res, next) {
  console.log("Pochnah q")
  var name = req.body.obj.name;
  var address = req.body.obj.address;
  var tag = req.body.obj.tag;
  var phone = req.body.obj.phone;
  var image = req.body.obj.image;
  var description = req.body.obj.description;
  var type = req.body.obj.type;
  var newObj = new Obj(name, address, tag, phone, image, description, type);
  var objCollection = db.get(type);
  objCollection.insert(newObj).then(function (data) {
    console.log("Do tuka q dokarah");
    res.end(JSON.stringify({ value: "true", obj: data }));
  },function(){}).catch(function(){});
});

module.exports = router;