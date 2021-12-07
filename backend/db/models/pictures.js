'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pictures = sequelize.define('Pictures', {
    title: DataTypes.STRING,
    picture: DataTypes.TEXT,
    spotId: DataTypes.INTEGER
  }, {});
  Pictures.associate = function(models) {
    // associations can be defined here
  };
  return Pictures;
};