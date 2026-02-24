const { Sequelize } = require('sequelize');
const path = require('path');

// Create SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'scms.db'),
  logging: false
});

module.exports = sequelize;
