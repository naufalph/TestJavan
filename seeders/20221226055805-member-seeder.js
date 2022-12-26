'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const memberData = require("../data/member.json");
    memberData.forEach(el=>{
      el.createdAt = el.updatedAt = new Date();
      el.totalAsset = 0;
    })
    await queryInterface.bulkInsert("Members", memberData, {});
  
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete("Members", null, {});
    
  }
};
