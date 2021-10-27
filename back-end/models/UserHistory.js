import pkg from 'sequelize';
const { Model, DataTypes } = pkg;
import { sequelize } from "../models/db.js";

class UserHistory extends Model {
  static associate() {}
}
UserHistory.init(
  {
    id_userHistory: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    id_project: {
      type: DataTypes.INTEGER,
      references: {
        model: "Project",
        key: "id_project",
      },
      allowNull: false
    },
    userHistory_description: {
      type: DataTypes.STRING,
    },
    userHistory_image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "UserHistory",
  }
);

export default UserHistory;
