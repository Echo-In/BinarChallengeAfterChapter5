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
    await queryInterface.bulkInsert('user_game_history', [{
      user_id: 3,
      score_result: 1,
      played_at: "2022-01-01",
      createdAt: new Date(). toISOString (),
      updatedAt: new Date(). toISOString (),
    },{
      user_id: 1,
      score_result: 1,
      played_at: "2022-01-01",
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
     await queryInterface.bulkDelete('user_game_history', null, {});
  }
};
