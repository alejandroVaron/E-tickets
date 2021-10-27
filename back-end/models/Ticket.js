import pkg from 'sequelize';
const { Model, DataTypes } = pkg;
import { sequelize } from "../models/db.js";

class Ticket extends Model {
  static associate() {}
}
Ticket.init(
  {
    id_ticket: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    id_userHistory: {
      type: DataTypes.INTEGER,
      references: {
        model: "UserHistory",
        key: "id_userHistory",
      },
      allowNull: false
    },
    ticket_comment: {
      type: DataTypes.STRING,
    },
    ticket_state: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Ticket",
  }
);

export default Ticket;
