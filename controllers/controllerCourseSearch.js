var model = require('../model/ModelCourse.js');
const controller = {
    async searchCourses(keyword){
        let result = await model.getCourses(keyword);
        if(process.env.USING_DATABASE== "postgre") return result.rows;
        return result
    }
};
module.exports = controller;