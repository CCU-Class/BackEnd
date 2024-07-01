var model = require('../model/ModelCourse.js');
const controller = {
    async recordCourse(course, courseTable){
        let result = await model.updateSelectionCount(course, 1, courseTable);
        return result;
    }
};
module.exports = controller;