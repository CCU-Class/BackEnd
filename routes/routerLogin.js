var express = require('express');
var router = express.Router();
var tokenConfig = require('../config/token');


router.post('/', async function(req, res) {

    //解析客户端请求的body中的内容，JSON编码处理和url编码处理
    const otp = String(req.body.otp);
    console.log(`otp=${otp}`);
    // const username = String(req.body.username);
    // const password = String(req.body.password);
    // const hash = await argon2.hash(password);
    // console.log(`hash=${hash}`);
    const controller = require("../controllers/controllerLogin");
    const result = await controller.login(otp);
    const token = tokenConfig.generateToken(
        {
            "username": "admin",
        }
    );
    if(result){
        res.send({
            "status": true,
            "token" : token
        });
    }else{
        res.send({
            "status": false,
        });
    }
});


module.exports = router;



