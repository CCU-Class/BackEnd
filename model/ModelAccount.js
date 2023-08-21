const database = require('../config/database');

const model={
    async getAccount(username){
        let str = `SELECT * FROM account WHERE username=$1`;
        if(process.env.USING_DATABASE== "mysql")str = "SELECT * FROM account WHERE username=?";
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
        let str = `UPDATE account SET last_login=NOW() AT TIME ZONE 'Asia/Taipei' WHERE username=$1`;
        if(process.env.USING_DATABASE== "mysql")str = "UPDATE account SET last_login=NOW() WHERE username=?";
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