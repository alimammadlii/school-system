'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Student extends Model {
  static associate(models) {
    Student.hasMany(models.Grade, { foreignKey: 'studentId' });
    Student.belongsToMany(models.Course, { through: models.StudentCourse, foreignKey: 'studentId' });
    Student.belongsToMany(models.Class, { through: models.ClassStudent, foreignKey: 'studentId' });
  }
}

Student.init({
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
  modelName: 'Student',
  tableName: 'Students',
  timestamps: true
});

module.exports = Student;