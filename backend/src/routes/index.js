const router = require("express").Router();
const user = require("./user.route");
const party = require("./party.route");

router.use("/auth", user);
router.use("/party", party);

module.exports = router;
