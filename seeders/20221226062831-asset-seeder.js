"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const assetData = require("../data/asset.json");
    assetData.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Assets", assetData, {});
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Assets", null, {});
  },
};
