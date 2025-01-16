'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    classId: DataTypes.INTEGER,
    student_no: DataTypes.INTEGER,
    password: DataTypes.STRING,
    accestoken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};