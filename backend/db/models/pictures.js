'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    title: DataTypes.STRING,
    picture: DataTypes.TEXT,
    spotId: DataTypes.INTEGER
  }, {});
  Picture.associate = function(models) {
    // associations can be defined here
  };
  return Picture;
};
