"use strict";
const { hashPassword } = require("../helpers/auth");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Customers",
      require("../data.json").customer.map((el) => {
        el.password = hashPassword(el.password);
        el.createdAt = el.updatedAt = new Date();
        return el;
      })
    );
    await queryInterface.bulkInsert(
      "Gadgets",
      require("../data.json").gadget.map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      })
    );
    await queryInterface.bulkInsert(
      "Stores",
      require("../data.json").store.map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
    await queryInterface.bulkDelete("Gadgets", null, {});
    await queryInterface.bulkDelete("Stores", null, {});
  },
};
