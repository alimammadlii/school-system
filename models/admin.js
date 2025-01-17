'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Admin extends Model {}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  tc: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accesToken: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'Admins',
  timestamps: true
});

module.exports = Admin;