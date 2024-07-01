var model = require('../model/ModelSemester.js');
const controller = {
    
    async getSemesters(){
        let result = await model.getSemesters();
        return result;
    }
};
module.exports = controller;