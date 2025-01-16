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
      }
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
