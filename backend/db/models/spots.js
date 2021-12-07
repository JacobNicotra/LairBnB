'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spots = sequelize.define('Spots', {
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Spots.associate = function(models) {
    // associations can be defined here
  };
  return Spots;
};