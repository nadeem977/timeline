const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

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

// Compared password
SchmeAuth.methods.comparePassword = async function(enterpassword){
    if (!enterpassword) {
      throw new Error("No password provided for comparison.");
  }
  
  // Check if this.password is provided
  if (!this.password) {
      throw new Error("No stored password found for comparison.");
  }
        return bcrypt.compare(enterpassword,this.password)
  }
const User = mongoose.model("User",SchmeAuth)

module.exports = User;