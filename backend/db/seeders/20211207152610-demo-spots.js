
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        title: 'Weekend Getaway near Highgarden',
        description: 'Enjoy a quaint cottage in the countryside.',
        userId: 6,
        price: 139
      },
      {
        title: 'Kings Landing Tavern Basement',
        description: 'Be in the heart of the city. Not exaclty royal accomodations, but its in close proximity to cheap ale.',
        userId: 4,
        price: 159

      },
      {
        title: 'Cabin in the North',
        description: 'Cold up here, but the there is plenty of firewood to keep you warm. ',
        userId: 3,
        price: 49

      },
      {
        title: 'Lower Deck',
        description: "Come see what sea life is all about. Our vessel will be ferrying between King's landing and the Iron Islands. ",
        userId: 1,
        price: 49

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
