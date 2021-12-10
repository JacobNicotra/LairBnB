
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pictures', [
      {
        title: 'Vale outside',
        picture: 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2017/07/24/Pictures/_4678933c-702c-11e7-a1e4-b67c25a49489.jpg',
        spotId: 1
      },
      {
        title: 'Vale inside',
        picture: 'https://image.shutterstock.com/image-photo/interior-vintage-cottage-kitchen-260nw-19613602.jpg',
        spotId: 1
      },
      {
        title: 'redKeep outside red',
        picture: 'https://www.game-of-thrones-dubrovnik-tour.com/wp-content/uploads/2016/01/GoT_Dubrovnik-73.jpg',
        spotId: 2
      },
      {
        title: 'north cab',
        picture: 'https://cbsnews3.cbsistatic.com/hub/i/r/2019/03/20/11d9285d-b59f-4231-8406-17d0c35464cb/thumbnail/1200x630/333715b8f75f2ff53fe933a0c469746f/irl-northofthewall.jpg',
        spotId: 3
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
