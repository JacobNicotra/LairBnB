
'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'yara@ironIslands.io',
        username: 'Yara Greyjoy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'ramsey@dreadfort.io',
        username: 'Ramsey Bolton',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'jon@winterIsComing.io',
        username: 'Jon Snow',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'cersei@kingsLanging.io',
        username: 'Cersei Lannister',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'dany@dragonstone.io',
        username: 'Daenerys Targaryen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Olenna@Highgarden.io',
        username: 'Olenna Tyrell',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'stan@stormlands.io',
        username: 'Stannis Baratheon',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'oberyn@dorne.io',
        username: 'Oberyn Martell',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
