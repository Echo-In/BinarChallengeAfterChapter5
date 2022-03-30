'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_login_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user_game', key: 'user_id' },
        allowNull: false,
      },
      login_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_login_history');
  }
};