"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Company", {
      id_company: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      company_nit: {
        type: Sequelize.STRING,
      },
      company_cellphone: {
        type: Sequelize.STRING,
      },
      company_address: {
        type: Sequelize.STRING,
      },
      company_email: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Company");
  },
};
