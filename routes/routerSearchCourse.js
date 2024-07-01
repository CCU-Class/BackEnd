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

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(day)){
    array = await controller.searchCoursesByDay(day, courseTable);
  }
  //console.log(array);
  res.send(array);
});

router.get('/ByTeacher', async function(req, res) {
  const Teacher = req.query.Teacher;
  
  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(Teacher)){
    array = await controller.searchCoursesByTeacher(Teacher, courseTable);
  }
  //console.log(array);
  res.send(array);
});

router.get('/GetGardeByDepartment', async function(req, res) {
  const Department = req.query.Department

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  if(regex.checkChineseEnglishNum(Department)){
    array = await controller.searchGradeByDepartment(Department, courseTable);
  }
  //console.log(array);
  res.send(array);
});

router.get('/ByDepartment', async function(req, res){
  const department = req.query.Department;

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  if(regex.checkChineseEnglishNum(department)){
    array = await controller.searchCourseByDepartment(department, courseTable);
  }
  // console.log(array);
  res.send(array);
});

router.get('/ByDepartmentAndGrade', async function(req, res){
  const department = req.query.Department;
  const grade = req.query.Grade;

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  if(regex.checkChineseEnglishNum(department) && regex.checkChineseEnglishNum(grade)){
    array = await controller.searchCourseByDepartmentAndGrade(department, grade, courseTable);
  }
  //console.log(array);
  res.send(array);
});

router.get('/getDepartment', async function(req, res){

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  array = await controller.getDepartment(courseTable);
  //console.log(array);
  res.send(array);
});

router.get('/searchDepartmentByOther', async function(req,res){
  let id = req.query.id;
  let class_name = req.query.class_name;
  let teacher = req.query.teacher;
  let class_room = req.query.class_room;
  let credit = req.query.credit;

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  array = await controller.searchDepartmentByOther(id, class_name, teacher, class_room, credit, courseTable);
  res.send(array);
});

router.get('/searchGradeByOther', async function(req,res){
  let id = req.query.id;
  let class_name = req.query.class_name;
  let teacher = req.query.teacher;
  let class_room = req.query.class_room;
  let credit = req.query.credit;

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;

  console.log(`id=${id}, class_room=${class_room}, credit=${credit}`);
  array = await controller.searchGradeByOther(id, class_name, teacher, class_room, credit, courseTable);
  res.send(array);
});

router.get('/');


router.get('/', async function(req, res) {
  const keyword = req.query.keyword;

  const year = req.query.year;
  const semester = req.query.semester;
  let courseTable = (year!=undefined && semester != undefined) ? `course${year}_${semester}` : undefined;
  if(!regex.checkCourseTable(courseTable)) courseTable = undefined;
  
  console.log(`keyword=${keyword}, year=${year}, semester=${semester}`);
  console.log(`couserTable = ${courseTable}`);
  
  // console.log(year);
  // console.log(semester);
  //keyword可能還要經過處理，例如去除空白、轉小寫等等
  //keyword = keyword.trim().toLowerCase();
  
  //=============讓controller幫我們查==========
  var array = null;
  if(regex.checkChineseEnglishNum(keyword)){
    array = await controller.searchCourses(keyword, courseTable);
  }
  
  
  //console.log(array);
  res.send(array);
});



module.exports = router;



