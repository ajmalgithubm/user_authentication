const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({status : false})
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, data) =>{
        if(err){
            return res.json({status: false})
        }else{
            console.log("user Id", data.id)
            const user = await User.findById(data.id).exec();
            if(user) return res.json({ status: true, user: user.username})
            else return res.json({ status: false})
        }
    })

}