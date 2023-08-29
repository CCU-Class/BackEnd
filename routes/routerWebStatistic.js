var express = require('express');
var router = express.Router();

const controllerVisitWebsite = require('../controllers/controllerVisitWebsite.js');

router.get("/getVisitCount", async function(req, res){
  let count = await controllerVisitWebsite.getVisitCount();
  //console.log(`count: ${count}`);
  res.send({
    value: count
  });
});

module.exports = router;