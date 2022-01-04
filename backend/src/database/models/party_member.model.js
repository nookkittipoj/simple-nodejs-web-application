"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PartyMembers extends Model {
    static associate(models) {
      PartyMembers.belongsTo(
        models.User,
        {
          foreignKey: 'user_id',
          as: "user"
        }
      )
      PartyMembers.belongsTo(
        models.Party,
        {
          foreignKey: 'party_id',
          as: "party"
        }
      )
      
      // PartyMembers.belongsToMany(
      //   models.Party,
      //   {
      //     through: 'party_members',
      //     foreignKey: 'party_id',
      //   }
      // );
      // PartyMembers.belongsToMany(
      //   models.User,
      //   {
      //     through: 'party_members',
      //     foreignKey: 'user_id'
      //   }
      // );
    }
  }
  PartyMembers.init(
    {
      party_id: { type: DataTypes.INTEGER, field: "party_id" },
      user_id: { type: DataTypes.INTEGER, field: "user_id" },
      is_join: { type: DataTypes.BOOLEAN, field: "is_join" },
      join_at: { type: 'TIMESTAMP', field: "join_at" },
      leave_at: { type: 'TIMESTAMP', field: "leave_at" },
      created_at: { type: 'TIMESTAMP', field: "created_at" },
      updated_at: { type: 'TIMESTAMP', field: "updated_at" },
    },
    {
      sequelize,
      modelName: "PartyMembers",
      tableName: "party_members",
    }
  );

  return PartyMembers;
};
