const User = require("../models/AuthModel");
const bcrypt = require("bcrypt");

const addNewUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(409).send("User with this email already exists");
    }

    const cryptPass = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: cryptPass,
    });

    await newUser.save();
    return res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const loginAuth = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) {
      return res.status(404).send("User with this email doesn't exist");
    }

    const isMatch = bcrypt.compareSync(req.body.password, findUser.password);
    if (!isMatch) {
      return res.status(404).send("Incorrect password");
    }

    return res.status(200).send(findUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};


module.exports = { addNewUser, loginAuth };
