'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Grades', {
      id: {
        primaryKey:true,
        allowNull:false,
        unique:true,
        autoIncrement: true,
        type:Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Student',
          key:'id'
        }
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Course',
          key: 'id'
        }
      },
      grade: {
        type: Sequelize.INTEGER
      }

    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
