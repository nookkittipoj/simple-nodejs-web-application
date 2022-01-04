const jwt = require("jsonwebtoken");
const userService = require("./user.service");

exports.login = async (req, res, next) => {
  const user = await userService.find({
    email: req.body.email,
  });
  if (user && (await userService.checkLoginPassword(user, req.body.password))) {
    req.user = user;
    next();
  } else {
    return res.status(401).json({
      error: true,
      message: "Incorrect email or password",
    });
  }
};

exports.register = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      error: true,
      message: "Email is require!",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      error: true,
      message: "Password is require!",
    });
  }
  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).json({
      error: true,
      message: "Confirm password not match",
    });
  }
  if (await userService.checkExistUser(req.body.email)) {
    return res.status(409).json({
      error: true,
      message: "This email already used",
    });
  }
  next();
};

exports.verify = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      error: true,
      message: "Unauthorization",
    });
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: true,
        message: "Forbidden",
      });
    }

    req.user = user.data;

    next();
  });
};
