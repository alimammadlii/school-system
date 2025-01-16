'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Course extends Model {
    static associate(models) {
        Course.hasMany(models.Grade, { foreignKey: 'courseId' });
        Course.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
        Course.belongsToMany(models.Student, { through: models.StudentCourse, foreignKey: 'courseId' });
    }
}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Teachers',
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
  modelName: 'Course',
  tableName: 'Courses',
  timestamps: true
});

module.exports = Course;