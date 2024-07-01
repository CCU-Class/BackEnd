var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllerSemester.js');
const regex = require('../utils/myRegex');

router.get('/all', async function(req,res){
    array = await controller.getSemesters();
    res.send(array);
  });

module.exports = router;