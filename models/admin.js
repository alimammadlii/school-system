'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    tc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true
    },
    password: DataTypes.STRING,
    accestoken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};