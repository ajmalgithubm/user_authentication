const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Your Email address is requires"],
        unique:true,
    },
    username:{
        type:String,
        required:[true, "Your Username is Required"],
    },
    password:{
        type:String,
        required:[true, "Your Password is Required"],
    },
    createdAt:{
        type:Date,
        default: new Date(),
    }
})

userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model('User', userSchema);