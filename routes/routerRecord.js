var express = require('express');
var router = express.Router();
const regex = require('../utils/myRegex');
const controller = require('../controllers/controllerCourseRecord.js');


router.get('/userSelectClass', async function(req, res) {
  let course = req.query.keyword;
  let id = course.id;
  let teacher = String(course.teacher).trim();
  // console.log(`userSelectClass, id: ${id}, teacher: ${teacher}`);
  // console.log(`regex:\nregex.checkNum(id)=${regex.checkNum(id)},\nregex.checkChineseEnglishNum(teacher)=${regex.checkChineseEnglishNum(teacher)}`)
  if(regex.checkNum(id) && regex.checkChineseEnglishNum(teacher)){
    let result = await controller.recordCourse(course);
    console.log(`result: ${result}`);
    if(result) res.send(true);
    else res.send(false);
  }else res.send(false);
});

module.exports = router;
