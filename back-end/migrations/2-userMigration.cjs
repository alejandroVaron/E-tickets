"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id_user: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_name: {
        type: Sequelize.STRING,
      },
      user_email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_company: {
        type: Sequelize.INTEGER,
        references: {
          model: "Company",
          key: "id_company",
        },
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User");
  },
};
