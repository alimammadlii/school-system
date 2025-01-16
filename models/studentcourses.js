'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class StudentCourse extends Model {}

StudentCourse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Course',
      key: 'id'
    }
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Student',
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
  modelName: 'StudentCourse',
  tableName: 'StudentCourses',
  timestamps: true
});

module.exports = StudentCourse;