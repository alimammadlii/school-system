'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

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
      model: 'Student',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Course',
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

module.exports = Grade;