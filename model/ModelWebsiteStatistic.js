const database = require('../config/database');

const model={
    async getVisitCount(web_name){
        let item_name = 'visit';
        if(web_name!=null||String(web_name).trim() != '')item_name += '_' + String(web_name).trim();
        let str = "select \`count\` from \`web_statistic\` where \`item_name\` = ?;";
        console.log(`query str = select \`count\` from \`web_statistic\` where \`item_name\` = ${item_name};`);
        
        //console.log(`query str=${str}`);
        return new Promise((resolve, reject) => {
            database.query(str, [item_name], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    },

    async increaseVisitCount(web_name,num){
        let item_name = 'visit';
        if(web_name === undefined || web_name=="undefined" || web_name == null || web_name == ""){
            web_name = ""; 
        }else{
            item_name += '_' + String(web_name).trim();
        }
        let str = `UPDATE \`web_statistic\` SET \`count\`=\`count\`+? WHERE \`item_name\`=?;`;
        console.log(`query str=UPDATE \`web_statistic\` SET \`count\`=\`count\`+${num} WHERE \`item_name\`=${num};`);
        return new Promise((resolve, reject) => {
            database.query(str, [num,item_name], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    },
    async getVisitCount(web_name){
        let item_name = 'visit';
        if(web_name === undefined || web_name=="undefined" || web_name == null || web_name == ""){
            web_name = ""; 
        }else{
            item_name += '_' + String(web_name).trim();
        }
        let str = "select \`count\` from \`web_statistic\` where \`item_name\` = ?;";
        console.log(`query str=select \`count\` from \`web_statistic\` where \`item_name\` = ${item_name};`);
        return new Promise((resolve, reject) => {
            database.query(str, [item_name], (err, result, fields) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    //console.log(result);
                    resolve(result);
                }
            });
        });
    }
};

module.exports = model;