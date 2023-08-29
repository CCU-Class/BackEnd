var express = require('express');
var router = express.Router();
const regex = require("../utils/myRegex.js")

const controllerVisitWebsite = require('../controllers/controllerVisitWebsite.js');

router.get("/getVisitCount", async function(req, res){
  
  let web_name = null;
  try{
    if(req.query.web_name!=undefined||String(req.query.web_name).trim() != '')web_name = String(req.query.web_name).trim();
  }catch(err){
    console.log(err);
    res.send(err);
  }
  if(web_name == undefined || web_name=="undefined" || web_name == null || web_name == "")web_name = "";
  let count = await controllerVisitWebsite.getVisitCount(web_name);
  res.send({
    value: count
  });
});

module.exports = router;