'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      'Users', // table name
      'profileUrl', // new field name
      {
        type: Sequelize.TEXT,
      }),
     await queryInterface.addColumn(
      'Posts', // table name
      'profileUrl', // new field name
      {
        type: Sequelize.TEXT,
      }),
     await queryInterface.addColumn(
      'Posts', // table name
      'imgUrl', // new field name
      {
        type: Sequelize.TEXT,
      }),
     await queryInterface.addColumn(
      'Comments', // table name
      'profileUrl', // new field name
      {
        type: Sequelize.TEXT,
      })
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
