const Sequelize = require("sequelize");

const sequelize = new Sequelize("party_haan", "root", "password", {
  host: "127.0.0.1",
  port: 3308,
  dialect: "mysql",
  logging: false,
  dialectOptions: {
      requestTimeout: 30000,
      encrypt: true
    }
});

module.exports = sequelize;
global.sequelize = sequelize;