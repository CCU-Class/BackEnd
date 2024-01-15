var model = require('../model/ModelCourse.js');
const controller = {
    async searchCourses(keyword){
        let result = await model.getCourses(keyword);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    },
    async searchCoursesByDay(day){
        let result = await model.getCoursesByDay(day);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    },
    async searchCoursesByTime(day, start, end){
        let result = await model.getCoursesByTime(day, start, end);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    },
    async searchCoursesByTeacher(Teacher){
        let result = await model.getCoursesByTeacher(Teacher);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    }, 
    
    async searchGradeByDepartment(department){
        let result = await model.getGradeByDepartment(department);
        return result;
    },
    async searchCourseByDepartment(department){
        let result = await model.getCourseByDepartment(department);
        return result;
    },
    async searchCourseByDepartmentAndGrade(department, grade){
        let result = await model.getCourseByDepartmentAndGrade(department, grade);
        return  result;
    },
    async getDepartment(){
        let result = await model.getDepartment();
        return  result;
    }
};
module.exports = controller;