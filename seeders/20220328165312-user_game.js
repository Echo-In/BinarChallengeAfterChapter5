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
    await queryInterface.bulkInsert('user_game', [{
      username: 'Admin',
      password: 'Admin2022!',
      usertype: 'A',
      createdAt: new Date(). toISOString (),
      updatedAt: new Date(). toISOString (),
    },{
      username: 'Player1',
      password: 'Player2022!',
      usertype: 'P',
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
     await queryInterface.bulkDelete('user_game', null, {});
  }
};
