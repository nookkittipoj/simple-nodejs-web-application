const models = require("../../database/models");
const Party = models.Party;
const PartyMembers = models.PartyMembers;
const User = models.User;
const bcrypt = require("bcrypt");

exports.checkExistUser = async (email) => {
  return await this.find({
    email,
  });
};

exports.find = async (condition) => {
  return await User.findOne({
    where: condition,
  });
};

exports.checkLoginPassword = async (user, passwordHash) => {
  return await bcrypt.compare(passwordHash, user.password);
};
