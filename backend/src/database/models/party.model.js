"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Party.hasMany(models.PartyMembers, {
          foreignKey: "party_id",
          as: "party_members"
        })
    }
  }
  Party.init(
    {
      name: DataTypes.STRING,
      member_limit: {
          type: DataTypes.INTEGER, 
          field: "member_limit"
      },
      created_at: { type: 'TIMESTAMP', field: "created_at" },
      updated_at: { type: 'TIMESTAMP', field: "updated_at" },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "party",
      camelCase: false,
      underscored: true,
      underscoredAll: true,
    }
  );
  return Party;
};
