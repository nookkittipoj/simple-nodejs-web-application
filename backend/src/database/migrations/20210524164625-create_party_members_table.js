'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("party_members", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      party_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      is_join: {
        type: Sequelize.BOOLEAN
      },
      join_at: { type: Sequelize.DATE, defaultValue: null },
      leave_at: { type: Sequelize.DATE, defaultValue: null },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("party_members");
  }
}
