'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey:true,
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:'Courses'
          },
          key: 'id'
        }
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Students'
          },
          key:'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
