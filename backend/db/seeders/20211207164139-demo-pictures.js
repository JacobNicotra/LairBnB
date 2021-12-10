
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
        title: 'Vale',
        picture: 'http://modernfarmer.com/wp-content/uploads/2014/07/highgarden.jpg',
        spotId: 1
      },
      {
        title: 'Vale',
        picture: 'https://www.roadaffair.com/wp-content/uploads/2019/04/dark-hedges-northern-ireland-uk-shutterstock_481335406.jpg',
        spotId: 1
      },
      {
        title: 'Vale',
        picture: 'https://i.pinimg.com/originals/fd/11/6e/fd116ee589d028c201d80e1dbbaa531f.jpg',
        spotId: 1
      },
      {
        title: 'redKeep outside red',
        picture: 'https://www.game-of-thrones-dubrovnik-tour.com/wp-content/uploads/2016/01/GoT_Dubrovnik-73.jpg',
        spotId: 2
      },
      {
        title: 'red',
        picture: 'https://www.messynessychic.com/wp-content/uploads/2013/06/tavern.jpg',
        spotId: 1
      },
      {
        title: 'r',
        picture: 'https://images.adsttc.com/media/images/5966/c43c/b22e/38a4/e100/0299/large_jpg/Main_street-Dubrovnik-2.jpg?1499907127',
        spotId: 1
      },
      {
        title: 'r',
        picture: 'https://media.architecturaldigest.com/photos/5cacb11b30b5edbab4b94fc7/16:9/w_2560%2Cc_limit/Courtesy%2520of%2520HBO%2520(Season%25205)%2520Kings%2520Landing%2520Arial.jpg',
        spotId: 1
      },
      {
        title: 'r',
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-xdxK-bWo8Qd4ID2Ub8sYLaiXzV6yGcdBcA&usqp=CAU',
        spotId: 1
      },
      {
        title: 'north cab',
        picture: 'https://cbsnews3.cbsistatic.com/hub/i/r/2019/03/20/11d9285d-b59f-4231-8406-17d0c35464cb/thumbnail/1200x630/333715b8f75f2ff53fe933a0c469746f/irl-northofthewall.jpg',
        spotId: 3
      },
      {
        title: 'north ',
        picture: 'https://watchersonthewall.com/wp-content/uploads/2017/11/Winterfell-white-raven.jpg',
        spotId: 3
      },
      {
        title: 'no',
        picture: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/old-log-cabin-cabin-in-snowfall-jeff-swan.jpg',
        spotId: 3
      },
      {
        title: 'n',
        picture: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2016/12/Game-of-Thrones-Weirwood-Tree.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5',
        spotId: 3
      },
      {
        title: 'ship',
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV7MSIOkoKNJKprDBofZFZfPglz6FR-gfVcw&usqp=CAU',
        spotId: 4
      },
      {
        title: 'n',
        picture: 'https://cdnb.artstation.com/p/assets/images/images/007/920/459/medium/olena-nemitkova-1920.jpg?1509367783',
        spotId: 4
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
