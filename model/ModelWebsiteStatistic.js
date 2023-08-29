const database = require('../config/database');

const model={
    async getVisitCount(){
        let str = "select \`count\` from \`web_statistic\` where \`item_name\` = 'visit';";
        //console.log(`query str=${str}`);
        return new Promise((resolve, reject) => {
            database.query(str, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    async increaseVisitCount(num){
        let str = `UPDATE \`web_statistic\` SET \`count\`=\`count\`+${num} WHERE \`item_name\`='visit';`;
        //console.log(`query str=${str}`);
        return new Promise((resolve, reject) => {
            database.query(str, (err, result, fields) => {
                if (err) {
                    console.log(err);
                    reject(false);
                } else {
                    //console.log(`update result: ${result}`);    
                    resolve(true);
                }
            });
        });
    },
    async getVisitCount(){
        let str = "select \`count\` from \`web_statistic\` where \`item_name\` = \'visit\';";
        console.log(`query str=${str}`);
        return new Promise((resolve, reject) => {
            database.query(str, (err, result, fields) => {
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