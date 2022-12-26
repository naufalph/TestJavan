"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const nucleusData = require("../data/nucleus.json");
    nucleusData.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Nucleus", nucleusData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Nucleus", null, {});
  },
};
