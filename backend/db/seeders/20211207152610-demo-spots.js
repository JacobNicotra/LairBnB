'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        title: 'Weekend Getaway in the Vale',
        description: 'Enjoy a quaint cottage in the countryside',
        userId: 1
      },
      {
        title: 'Red Keep Condo',
        description: 'be in the heart of the keep',
        userId: 1
      },
      {
        title: 'Cabin in the North',
        description: 'Cold up here, and winter is coming',
        userId: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
