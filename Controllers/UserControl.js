// const { hash } = require("bcrypt");
const User = require("../Schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUsers = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(400).send({ Message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // const hashedPassword2 = await bcrypt.hash(password2, 10)/;
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  next();
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(400).send({ Message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      res.status(400).send({ Message: "Password does not match" });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2m", // Set token expiration time
      }
    );
    res.send({ Message: "Login Successfully", existingUser, token });
  } catch (error) {
    console.log(error);
  }
};

const GetUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

const GetUserById = async(req,res) => {
  try {
    const {userId} = req.params
    const user = await User.findById(userId)
    res.send(user)
  } catch (error) {
    console.log(error)
  }
}

const DeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDeleted = await User.findById(userId);
    if (!userDeleted) {
      res.status(400).send({ Message: "User does not exist" });
    }
    await userDeleted.deleteOne();
    res.status(200).send({ Message: "User deleted" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { RegisterUsers, GetUsers, LoginUser, DeleteUser, GetUserById };
