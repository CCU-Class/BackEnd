const database = require('../config/database');

const model={
    async getSemesters(username){
        let str = `SELECT \`year\`, \`semester\` FROM \`semester\` `;
        // if(process.env.USING_DATABASE== "mysql")str = "SELECT * FROM account WHERE username=?";
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
    }
};

module.exports = model;