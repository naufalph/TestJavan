"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productRawData = await fetch(
      "https://dummyjson.com/products?limit=100"
    ).then((res) => res.json());

    const productData = productRawData.products;

    productData.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      delete el.id;
      delete el.discountPercentage;
      delete el.rating;
      delete el.stock;
      delete el.thumbnail;
      delete el.images;
      delete el.category;
    });
    // console.log(productData)
    await queryInterface.bulkInsert("Products", productData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
