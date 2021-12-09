
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        title: 'Weekend Getaway in the Vale',
        description: 'Enjoy a quaint cottage in the countryside',
        userId: 4
      },
      {
        title: 'Kings Landing Tavern Basement',
        description: 'be in the heart of the keep',
        userId: 5
      },
      {
        title: 'Cabin in the North',
        description: 'Cold up here, and winter is coming',
        userId: 4
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      return queryInterface.bulkDelete('Spots', null, {});

  }
};