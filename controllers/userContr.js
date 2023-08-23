const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Register
//public aces
const registUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("All fields are important");
  }

  const userAvail = await User.findOne({ email });
  if (userAvail) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  //hashed pswd
  const hashedpswd = await bcrypt.hash(password, 10);
  console.log("Hashed password: ", hashedpswd);
  const user = await User.create({
    username,
    email,
    password: hashedpswd,
  });
  console.log(`user created sucesfully ${user}`);
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Useer data is not vaid");
  }

  res.json({ message: "register the user" });
});

//Login
//public acess
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password required");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const acesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACESSTOKEN_TOKEN,
      { expiresIn: "2h" }
    );
    res.status(200).json({ acesstoken });
  } else {
    res.status(401);
    throw new Error("email or password not valid");
  }
});

//Current
//acess private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
  console.log(req.user);
});

module.exports = { registUser, loginUser, currentUser };
