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
    await queryInterface.bulkInsert('user_game_biodata', [{
      user_id: 3,
      firstname: 'Xeppa',
      middlename: null,
      lastname: null,
      dob: "1900-01-01",
      birthplace: "Jakarta",
      email: 'usertest@gmail.com',
      createdAt: new Date(). toISOString (),
      updatedAt: new Date(). toISOString (),
    },{
      user_id: 1,
      firstname: 'Leaf',
      middlename: null,
      lastname: null,
      dob: "1900-01-01",
      birthplace: "Jakarta",
      email: 'leaf@gmail.com',
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
     await queryInterface.bulkDelete('user_game_biodata', null, {});
  }
};
