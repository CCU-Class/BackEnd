var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllerCourseSearch');
const regex = require('../utils/myRegex');
var argon2 = require('argon2');
var jwt = require('jsonwebtoken');
var tokenConfig = require('../config/token');


router.post('/', async function(req, res) {
    const token = String(req.body.token);
    const decoded = await tokenConfig.verifyToken(token, tokenConfig.key);
    if(decoded==false){
        res.send({
            "status": false,
        });
    }else{
        res.send({
            "status": true,
        });
    }
});


module.exports = router;



