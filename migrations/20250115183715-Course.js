'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        primaryKey:true,
        type:Sequelize.INTEGER
      },
      courseName: {
        type:Sequelize.STRING
      },
      teacherId: {
        type:Sequelize.INTEGER,
        references: {
          model:'Teachers',
          key:'id'
        }
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
