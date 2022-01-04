const router = require("express").Router();
const userController = require("../controllers/user.controller");
const userDTO = require("../services/user/user.dto");

router.post("/login", userDTO.login, userController.login);
router.post("/register", userDTO.register, userController.register);

module.exports = router;
