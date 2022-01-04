const partyService = require("../services/party/party.service");
const partyMemberService = require("../services/party-members/party-member.service");

const exception = (error, message = "Some error occurred") => {
  return {
    message: error.message || message,
  };
};

exports.findAll = async (req, res) => {
  try {
    const partys = await partyService.findAll();
    return res.json({
      data: partys,
    });
  } catch (err) {
    res
      .status(500)
      .send(exception(err, "Some error occurred while retrieving data."));
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const partys = await partyService.findOne(id);
    return res.json({
      data: partys,
    });
  } catch (err) {
    res
      .status(500)
      .send(exception(err, "Some error occurred while retrieving data."));
  }
};

exports.create = async (req, res) => {
  try {
    const party = await partyService.create(req.body, req.user);
    return res.json({
      data: party,
    });
  } catch (err) {
    res
      .status(500)
      .send(exception(err, "Some error occurred while creating the patry."));
  }
};

exports.join = async (req, res) => {
  try {
    const payload = req.body;
    await partyMemberService.create(
      {
        party_id: payload.party_id,
        is_join: true,
        join_at: new Date(),
      },
      req.user
    );
    return res.json({
      data: await partyService.findPartyWithJoinMember(payload.party_id),
    });
  } catch (err) {
    res
      .status(500)
      .send(exception(err, "Some error occurred while joining the patry."));
  }
};

exports.leave = async (req, res) => {
  try {
    const payload = req.body;
    const user = req.user;
    await partyMemberService.update(
      {
        party_id: payload.party_id,
        user_id: user.id,
        is_join: true,
      },
      {
        is_join: false,
        leave_at: new Date(),
      }
    );
    return res.json({
      data: await partyService.findPartyWithJoinMember(payload.party_id),
    });
  } catch (err) {
    res
      .status(500)
      .send(exception(err, "Some error occurred while leaving the patry."));
  }
};
