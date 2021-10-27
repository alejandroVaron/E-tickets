"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Project", {
      id_project: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_company: {
        type: Sequelize.INTEGER,
        references: {
          model: "Company",
          key: "id_company",
        },
        allowNull: false
      },
      project_description: {
        type: Sequelize.STRING,
      },
      project_image: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Project");
  },
};
