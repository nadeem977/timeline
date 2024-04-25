const User = require("../models/AuthModel");
const bcrypt = require("bcrypt");

const addNewUser = async (req, res) => {
  try {
    const criptpass = bcrypt.hashSync(req.body.password, 5);
    const nnewUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: criptpass,
    });
    if (nnewUser) {
      nnewUser.save();
      res.status(200).send(nnewUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const loginAuth = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user)
    if (!res) return res.status(404).send("this email is not exist ");
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { addNewUser, loginAuth };
