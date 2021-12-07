
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pictures', [
      {
        title: 'Vale outside',
        picture: 'https://awoiaf.westeros.org/images/thumb/8/8d/TN-The_Vale_of_Arryn.jpg/350px-TN-The_Vale_of_Arryn.jpg',
        spotId: 1
      },
      {
        title: 'Vale inside',
        picture: 'https://image.shutterstock.com/image-photo/interior-vintage-cottage-kitchen-260nw-19613602.jpg',
        spotId: 1
      },
      {
        title: 'redKeep outside red',
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTfJhZ5HVS8ZBhV2DYCxpiLps14H2H6IsqA&usqp=CAU',
        spotId: 2
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
      return queryInterface.bulkDelete('Pictures', null, {});

  }
};
