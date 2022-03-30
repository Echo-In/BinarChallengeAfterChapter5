'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user_game_login_history', [{
      user_id: 3,
      login_time: new Date(). toISOString (),
      createdAt: new Date(). toISOString (),
      updatedAt: new Date(). toISOString (),
    },{
      user_id: 3,
      login_time: "1900-01-01",
      createdAt: new Date(). toISOString (),
      updatedAt: new Date(). toISOString (),
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user_game_login_history', null, {});
  }
};
