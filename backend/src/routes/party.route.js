const router = require("express").Router();
const partyController = require("../controllers/party.controller");
const userDIO = require("../services/user/user.dto");
const partyDTO = require("../services/party/party.dto");

router.get("/", partyController.findAll);
router.post("/join", [userDIO.verify, partyDTO.join], partyController.join);
router.post("/leave", [userDIO.verify, partyDTO.leave], partyController.leave);
router.get("/:id", partyController.findOne);
router.post("/", [userDIO.verify, partyDTO.create], partyController.create);

module.exports = router;
