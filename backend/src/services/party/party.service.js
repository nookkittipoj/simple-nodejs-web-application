const models = require("../../database/models");
const Party = models.Party;
const PartyMembers = models.PartyMembers;
const User = models.User;

const queryBuilder = {
  attributes: ["id", "name", "member_limit", "created_at"],
  include: [
    {
      model: PartyMembers,
      attributes: [
        "id",
        "party_id",
        "user_id",
        "is_join",
        "join_at",
        "leave_at",
        "created_at",
      ],
      as: "party_members",
      include: [
        {
          model: User,
          attributes: ["id", "email", "created_at"],
          as: "user",
        },
      ],
    },
  ],
};

exports.findAll = async () => {
  return await Party.findAll(queryBuilder);
};

exports.findOne = async (id) => {
  return await Party.findOne({
    where: { id: id },
    ...queryBuilder,
  });
};

exports.findPartyWithJoinMember = async (id) => {
  return await Party.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: PartyMembers,
        attributes: [
          "id",
          "party_id",
          "user_id",
          "is_join",
          "join_at",
          "leave_at",
          "created_at",
        ],
        as: "party_members",
        where: {
          is_join: true,
        },
      },
    ],
  });
};

exports.create = async (payload, user) => {
  return await Party.create({
    name: payload.name,
    member_limit: payload.member_limit,
    user_id: user.id,
  });
};

exports.checkPaytyIsFull = async (partyId) => {
  const party = await this.findPartyWithJoinMember(partyId);
  return party && party.member_limit == party.party_members.length;
};
