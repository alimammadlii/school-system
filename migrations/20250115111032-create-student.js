'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      classId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Class',
          key:'id'
        }
        
      },
      studentNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      accesToken: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};