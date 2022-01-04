const partyService = require("../party/party.service");
const partyMemberService = require("../party-members/party-member.service");

exports.create = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: true,
      message: "Name is require!",
    });
  }
  if (!req.body.member_limit) {
    return res.status(400).json({
      error: true,
      message: "Member limit is require!",
    });
  }
  if (req.body.member_limit > 10) {
    return res.status(400).json({
      error: true,
      message: "Member maximun 10!",
    });
  }
  next();
};

exports.join = async (req, res, next) => {
  const payload = req.body;
  if (!payload.party_id) {
    return res.status(400).json({
      error: true,
      message: "Party is require!",
    });
  }
  if (await partyService.checkPaytyIsFull(payload.party_id)) {
    return res.status(400).json({
      error: true,
      message: "Party is full!",
    });
  }
  const checkExist = await partyMemberService.find({
    party_id: payload.party_id,
    user_id: req.user.id,
    is_join: true,
  });
  if (checkExist) {
    return res.status(409).json({
      error: true,
      message: "User already join this party!",
    });
  }
  next();
};

exports.leave = async (req, res, next) => {
  const payload = req.body;
  if (!payload.party_id) {
    return res.status(400).json({
      error: true,
      message: "Party is require!",
    });
  }
  const checkExist = await partyMemberService.find({
    party_id: payload.party_id,
    user_id: req.user.id,
  });
  if (checkExist) {
    next();
  } else {
    return res.status(404).json({
      error: true,
      message: "Not found!",
    });
  }
};
