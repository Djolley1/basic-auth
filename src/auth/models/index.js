require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const environment = process.env.NODE_ENV;
const testOrProduction = (environment === 'test' || environment === 'production');
console.log(process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: testOrProduction ? false : console.log // Enable logging in development
});
const Users = require('./user-model');
const userModel = Users (sequelize, DataTypes);

module.exports = { sequelize, userModel };
