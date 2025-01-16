'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Teachers', {
      id: {
        primaryKey: true,
        allowNull:false,
        autoIncrement:true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      tc: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password: {
        allowNull:false,
        type:Sequelize.STRING
      },
      accesToken: {
        type: Sequelize.STRING
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Teachers');
  }
};
