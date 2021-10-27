"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Ticket", {
      id_ticket: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_userHistory: {
        type: Sequelize.INTEGER,
        references: {
          model: "UserHistory",
          key: "id_userHistory",
        },
        allowNull: false
      },
      ticket_comment: {
        type: Sequelize.STRING,
      },
      ticket_state: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Ticket");
  },
};
