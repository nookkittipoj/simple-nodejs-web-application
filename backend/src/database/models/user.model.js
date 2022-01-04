"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.PartyMembers, {
        as: "party_members",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: { type: "TIMESTAMP", field: "created_at" },
      updated_at: { type: "TIMESTAMP", field: "updated_at" },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "users",
      camelCase: false,
      underscored: true,
      underscoredAll: true,
    }
  );
  return User;
};
