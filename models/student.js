'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
    stdudentNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Classes'
        },
        key: 'id'
      }
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
  return Student;
}