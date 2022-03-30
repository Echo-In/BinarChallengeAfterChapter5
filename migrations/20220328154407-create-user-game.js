'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING
      },
      usertype: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game');
  }
};