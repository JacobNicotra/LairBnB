'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    checkIn: DataTypes.STRING,
    checkOut: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Spot, { foreignKey: "spotId" });

  };
  return Booking;
};
