"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserHistory", {
      id_userHistory: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_project: {
        type: Sequelize.INTEGER,
        references: {
          model: "Project",
          key: "id_project",
        },
      },
      userHistory_description: {
        type: Sequelize.STRING,
      },
      userHistory_image: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserHistory");
  },
};
