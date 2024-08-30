var modelAccount = require('../model/ModelAccount.js');
var argon2 = require('argon2');

const controller = {
    async login(otp){
        let result = await this.varifyAccount(otp);
        if(!result)return false;
        //更新登入時間
        await this.updateLoginTime('admin');
        return true;
    },
    async varifyAccount(otp){
        // let result = await modelAccount.getAccount(username);
        // if(!result)return false;
        // if(process.env.USING_DATABASE== "postgre") result = result.rows;
        //驗證密碼
        // if(result.length == 0)return false;
        // const tureHash = result[0].password_hash;
        // succ = await argon2.verify(tureHash, password);
        //console.log(succ);
        const succ = await modelAccount.verifyOTP(otp);
        if(!succ)return false;
        return  true;
    },
    async updateLoginTime(username){
        await modelAccount.updateLoginTime(username);
    }
}

module.exports = controller;