'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const customerSchema = require('./customers')
const reviewSchema = require('./reviews')
require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/auth-module';

// Connection to the Database
const sequelize = new Sequelize(DATABASE_URL);

// Customers
const Customers = customerSchema(sequelize, DataTypes);


// Reviews
const Reviews = reviewSchema(sequelize, DataTypes);

// Create associations 
Customers.hasMany(Reviews, {foreignKey: 'customerId', sourceKey: 'id'});
Reviews.belongsTo(Customers, {foreignKey: 'customerId', targetKey: 'id'});

module.exports = {
  sequelize,
  customers: Customers,
  reviews: Reviews,
};