const mongoose = require("mongoose")


const SchmeAuth = mongoose.Schema({
 
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    phone:{
        type:Number
    }
    
},{timestamps:true})

const User = mongoose.model("User",SchmeAuth)

module.exports = User;