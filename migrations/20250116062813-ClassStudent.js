'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ClassStudents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Student',
          key: 'id',
        }
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Class',
          key: 'id'
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
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
