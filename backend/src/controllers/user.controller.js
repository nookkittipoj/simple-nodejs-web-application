const models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = models.User;

exports.register = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hashPassword,
    });
    return res.send(user);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the Todo.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.user;
    return res.send({
      id: user.id,
      email: user.email,
      access_token: this.generateToken(user),
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the Todo.",
    });
  }
};

exports.generateToken = (user) => {
  return jwt.sign({ data: user }, process.env.JWT_TOKEN, {
    expiresIn: "24h",
  });
};
