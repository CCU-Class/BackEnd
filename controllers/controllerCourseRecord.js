const { save } = require('debug/src/browser.js');
var model = require('../model/ModelCourse.js');
const controller = {
    async recordCourse(course, courseTable){
        let result = await model.updateSelectionCount(course, 1, courseTable);
        return result;
    },
    async saveCourseRecord(data){
        let result = await model.saveCourseRecord(data);
        return result;
    },
    async getCourseRecord(uuid){
        let result = await model.getCourseRecord(uuid);
        if(result.length == 0) return false;
        return result[0];
    },
};
module.exports = controller;