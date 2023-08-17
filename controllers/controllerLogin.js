var modelAccount = require('../model/ModelAccount.js');
var argon2 = require('argon2');

const controller = {
    async login(username, password){
        let result = await this.varifyAccount(username, password);
        if(!result)return false;
        //更新登入時間
        await this.updateLoginTime(username);
        return true;
    },
    async varifyAccount(username, password){
        let result = await modelAccount.getAccount(username);
        if(!result)return false;
        if(process.env.USING_DATABASE== "postgre") result = result.rows;
        //驗證密碼
        if(result.length == 0)return false;
        const tureHash = result[0].password_hash;
        succ = await argon2.verify(tureHash, password);
        //console.log(succ);
        if(!succ)return false;
        return  true;
    },
    async updateLoginTime(username){
        await modelAccount.updateLoginTime(username);
    }
}

module.exports = controller;