const User = require("../models/AuthModel");
const bcrypt = require("bcrypt");

const addNewUser = async (req, res) => {
  try {
    const criptpass = bcrypt.hashSync(req.body.password, 5);
     const findUser = User.findOne({email:req.body.email})
     if(findUser){
    return  res.status(400).json({success:false,message:"User already exist in system"})
     }
    const nnewUser = new User({
      username: req.body.username,
      email: req.body.email, 
      phone: req.body.phone,
      password: criptpass,
    });
      nnewUser.save();
      res.status(200).json({success:true,message:"User successfully save in system",data:addNewUser})
  } catch (error) {
    console.log(error);
    res.status(500).send(error);   
  } 
};
   
const loginAuth = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    if (!email || !password) {
      return res.status(401).json({ message: "Fields Can't be null", success: false });
    }
    const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid email or password", success: false });
      }
      const ispasswordmatched = await user.comparePassword(password);
      if (!ispasswordmatched) {
        return res
          .status(401)
          .json({ message: "Invalid email or password", success: false });
      }
    res.status(200).json({success:true,data:user});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { addNewUser, loginAuth };
