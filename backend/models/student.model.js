const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  phone: {
    type: DataTypes.STRING
  },
  course: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.INTEGER
  },
  fees: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  paid: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  tableName: 'students',
  timestamps: true
});

module.exports = Student;
