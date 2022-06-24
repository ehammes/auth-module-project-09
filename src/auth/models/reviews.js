'use strict';


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('reviews', {
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuisineType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};