const database = require('../config/database');

const model={
    async getAccount(username){
        const str = `SELECT * FROM account WHERE username=$1`;
        // console.log(`query=SELECT * FROM account WHERE username=${username}`);
        return new Promise((resolve, reject) => {
            database.query(str,[username], (err, result, fields) => {
                if(err){
                    //console.log(err);
                    reject(err);
                }else{
                    //console.log(result);
                    resolve(result);
                }
            })
        });
    },
    async updateLoginTime(username){
        //UTC+8
        const str = `UPDATE account SET last_login=NOW() AT TIME ZONE 'Asia/Taipei' WHERE username=$1`;
        return new Promise((resolve, reject) => {
            database.query(str,[username], (err, result, fields) => {
                if(err){
                    //console.log(err);
                    reject(err);
                }else{
                    //console.log(result);
                    resolve(result);
                }
            })
        });
    }
    
};

module.exports = model;