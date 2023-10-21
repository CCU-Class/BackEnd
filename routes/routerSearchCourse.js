var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllerCourseSearch');
const regex = require('../utils/myRegex');


router.get('/ByTime', async function(req, res) {
  const day = req.query.day;
  const start = req.query.start;
  const end = req.query.end;
  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(day)){
    array = await controller.searchCoursesByTime(day, start, end);
  }
  //console.log(array);
  res.send(array);
});

router.get('/ByDay', async function(req, res) {
  const day = req.query.day;

  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(day)){
    array = await controller.searchCoursesByDay(day);
  }
  //console.log(array);
  res.send(array);
});

router.get('/ByTeacher', async function(req, res) {
  const Teacher = req.query.Teacher;
  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(Teacher)){
    array = await controller.searchCoursesByTeacher(Teacher);
  }
  //console.log(array);
  res.send(array);
});

router.get('/', async function(req, res) {
  const keyword = req.query.keyword;
  console.log(keyword)
  //keyword可能還要經過處理，例如去除空白、轉小寫等等
  //keyword = keyword.trim().toLowerCase();
  
  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(keyword)){
    array = await controller.searchCourses(keyword);
  }
  
  //console.log(array);
  res.send(array);
});



module.exports = router;



