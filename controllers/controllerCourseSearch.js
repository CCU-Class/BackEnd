var model = require('../model/ModelCourse.js');
const controller = {
    async searchCourses(keyword, courseTable){
        let result = await model.getCourses(keyword, courseTable);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    },
    async searchCoursesByDay(day, courseTable){
        let result = await model.getCoursesByDay(day, courseTable);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    },
    async searchCoursesByTime(day, start, end){
        let result = await model.getCoursesByTime(day, start, end);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    },
    async searchCoursesByTeacher(Teacher, courseTable){
        let result = await model.getCoursesByTeacher(Teacher, courseTable);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    }, 
    
    async searchGradeByDepartment(department, courseTable){
        let result = await model.getGradeByDepartment(department, courseTable);
        return result;
    },
    async searchCourseByDepartment(department, courseTable){
        console.log("controller")
        let result = await model.getCourseByDepartment(department, courseTable);
        return result;
    },
    async searchCourseByDepartmentAndGrade(department, grade, courseTable){
        let result = await model.getCourseByDepartmentAndGrade(department, grade, courseTable);
        return  result;
    },
    async getDepartment(courseTable){
        let result = await model.getDepartment(courseTable);
        return  result;
    },
    async searchDepartmentByOther(id, class_name, teacher, class_room, credit, courseTable){
        let result = await model.getDepartmentByOther(id, class_name, teacher, class_room, credit, courseTable);
        return result;
    },
    async searchGradeByOther(id, class_name, teacher, class_room, credit, courseTable){
        let result = await model.getGradeByOther(id, class_name, teacher, class_room, credit, courseTable);
        return result;
    }
};
module.exports = controller;