// Check for username and password in post login request
// if matches create and release a jwt
// send jwt to front end

const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors");
const CustomApIError = require("../errors/custom-error");
const login = async (req, res) => {
  const { username, password } = req.body;
  // different ways to validate
  // mongo
  // joi
  // check in controller
  if (!username || !password) {
    throw new BadRequestError("please provide email and password");
  }

  const id = new Date().getDate();
  //   try to keep payload small for better user experience
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //   res.send("Fake login/Register?signup Route");
  res.status(200).json({ msg: "user creatd", token });
};

const dashboard = async (req, res) => {
  console.log("REq USER", req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello,${req.user.username}`,
    secret: `HEre is your authorized data,your Lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
