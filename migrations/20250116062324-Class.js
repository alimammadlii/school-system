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
      },
      createdAt: {
        type: Sequelize.DATE, // createdAt sütunu
        allowNull: false,
        defaultValue: Sequelize.fn('now'), // Varsayılan olarak güncel zaman
      },
      updatedAt: {
        type: Sequelize.DATE, // updatedAt sütunu
        allowNull: false,
        defaultValue: Sequelize.fn('now'), // Varsayılan olarak güncel zaman
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');     
  }
};
