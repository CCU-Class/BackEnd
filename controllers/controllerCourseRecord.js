var model = require('../model/ModelCourse.js');
const controller = {
    async recordCourse(course){
        let result = await model.updateSelectionCount(course, 1);
        return result;
    }
};
module.exports = controller;