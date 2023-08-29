var model = require('../model/ModelWebsiteStatistic.js');
const controller = {
    async record(){
        let result = await model.increaseVisitCount(1);
        return result;
    },
    async getVisitCount(){
        let result = await model.getVisitCount();
        
        console.log(`result: ${Number(result[0].count)}`);
        return Number(result[0].count);
    }
};
module.exports = controller;