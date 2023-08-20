const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.createSecretToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn:3*24*60*60
    })
}