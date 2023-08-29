var model = require('../model/ModelWebsiteStatistic.js');
const controller = {
    async record(web_name){
        let result = await model.increaseVisitCount(web_name,1);
        return result;
    },
    async getVisitCount(web_name){
        let result = await model.getVisitCount(web_name);
        
        console.log(`result: ${Number(result[0].count)}`);
        return Number(result[0].count);
    }
};
module.exports = controller;