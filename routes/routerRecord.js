var express = require('express');
var router = express.Router();
const regex = require('../utils/myRegex');
const controllerCourseRecord = require('../controllers/controllerCourseRecord.js');
const controllerVisitWebsite = require('../controllers/controllerVisitWebsite.js');


router.get('/userSelectClass', async function(req, res) {
  let course = req.query.keyword;
  let id = course.id;
  let teacher = String(course.teacher).trim();

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = `course${year}_${semester}`;
  if(regex.checkCourseTable(courseTable)) courseTable = undefined;

  // console.log(`userSelectClass, id: ${id}, teacher: ${teacher}`);
  // console.log(`regex:\nregex.checkNum(id)=${regex.checkNum(id)},\nregex.checkChineseEnglishNum(teacher)=${regex.checkChineseEnglishNum(teacher)}`)
  if(regex.checkNum(id) && regex.checkChineseEnglishNum(teacher)){
    let result = await controllerCourseRecord.recordCourse(course, courseTable);
    console.log(`result: ${result}`);
    if(result) res.send(true);
    else res.send(false);
  }else res.send(false);
});


router.get('/visistWebsite', async function(req, res){
  let web_name = null;
  try{
    if(req.query.web_name!=undefined||String(req.query.web_name).trim() != '')web_name = String(req.query.web_name).trim();
  }catch(err){
    console.log(err);
    res.send(err);
  }
  if(web_name == undefined || web_name=="undefined" || web_name == null || web_name == "")web_name = "";
  let result = await controllerVisitWebsite.record(web_name);
  if(result){
    res.send(true);
  }else{
    res.send(false);
  } 
});

module.exports = router;
