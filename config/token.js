var jwt = require('jsonwebtoken');
require('dotenv').config();

const key = process.env.JWT_KEY;

const tokenConfig = {
    generateToken(payload){
        return jwt.sign({payload}, key, {expiresIn: '30s'});
    },
    async verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, key, (err, decoded) => {
                if (err) {
                    //console.log(`err=${err}`);
                    resolve(false);
                } else {
                    resolve(decoded);
                }
            });
        });
    },
    removeToken(token) {
        jwt.destroy(token);
    }
    
};

module.exports = tokenConfig;