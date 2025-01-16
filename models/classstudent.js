'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class ClassStudent extends Model {}

ClassStudent.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Student',
      key: 'id'
    }
  },
  classId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Class',
      key: 'id'
    }
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
  modelName: 'ClassStudent',
  tableName: 'ClassStudents',
  timestamps: true
});

module.exports = ClassStudent;