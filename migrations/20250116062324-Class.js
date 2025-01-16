'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id:  {
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false
      },
      className: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');     
  }
};
