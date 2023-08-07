var express = require('express');
var router = express.Router();


router.get('/userSelectClass', function(req, res) {
  obj = req.query.keyword;
  // console.log(obj)
  if(obj) res.send(true);
  else res.send(false);
});

module.exports = router;
