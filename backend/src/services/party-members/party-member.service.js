const models = require("../../database/models");
const PartyMembers = models.PartyMembers;

exports.update = async (conditions, payload) => {
  const partyMember = await PartyMembers.findOne({
    where: conditions,
  });
  return await partyMember.update(payload);
};

exports.find = async (condition) => {
  return await PartyMembers.findOne({
    where: condition,
  });
};

exports.create = async (payload, user) => {
  return await PartyMembers.create({ ...payload, user_id: user.id });
};
