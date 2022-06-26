'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customers', {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
