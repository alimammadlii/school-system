'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    static associate(models) {
        StudentCourse.belongsTo(models.Student, { foreignKey: 'studentId' });
        StudentCourse.belongsTo(models.Course, { foreignKey: 'courseId' });
    }
  }
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
  return StudentCourse;
}