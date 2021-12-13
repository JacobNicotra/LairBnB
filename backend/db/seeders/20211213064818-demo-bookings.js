
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
// yyyy-MM-dd

      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Bookings', [
      {
        checkIn: '2021-12-27',
        checkOut: '2021-12-29',
        userId: 1,
        spotId: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Bookings', null, {});
    */
    return queryInterface.bulkDelete('Bookings', null, {});

  }
};
