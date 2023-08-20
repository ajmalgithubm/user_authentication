const User = require('../Models/UserModel')
const {createSecretToken} = require('../Util/SecretToken')
const bcrypt = require('bcrypt')

 
module.exports.Signup = async (req, res, next) => {
    try{
        const {email, password, username, createdAt} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json( { message: "user is already exists"} )
        }
        const user = await User.create({email, password, username, createdAt});
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        })
        res.status(201).json({message:'User Signed SuccessFully', success:true, user})
        next()
    }catch(err){
        console.error(err)
    }
}


module.exports.LogIn =async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({ message: "All fields are Required!"});
        }
        const user = await User.findOne({email}).exec();
        //   console.log("user is", user)
        if(!user){
            return res.json({ message: "Incorrect The email Adress and Password"});
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            return res.json({ message:"Incorrect Password"});
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials:true,
            httpOnly:false
        })
        res.status(201).json({message:'User Logged SuccessFully', success:true, })
        next()
    }catch(err){
        console.error(err)
    }
}
