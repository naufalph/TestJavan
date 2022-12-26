'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Nucleus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Members",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      childId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Members",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Nucleus');
  }
};