'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    static associate(models) {
        Grade.belongsTo(models.Student, { foreignKey: 'studentId' });
        Grade.belongsTo(models.Course, { foreignKey: 'courseId' });
    }
  }
  Grade.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Students"
        },
        key: 'id'
      }
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Courses"
        },
        key: 'id'
      }
    },
    grade: {
      type: DataTypes.INTEGER
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
    modelName: 'Grade',
    tableName: 'Grades',
    timestamps: true
  });
  return Grade;
}