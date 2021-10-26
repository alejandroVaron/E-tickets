import { Model, DataTypes } from "sequelize";
import { sequelize } from "../models/db.js";

class User extends Model {
  static associate() {}
}
User.init(
  {
    id_user: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    user_email: {
      type: DataTypes.STRING,
      unique: true,
    },
    user_password: DataTypes.STRING,
    id_company: {
      type: DataTypes.INTEGER,
      references: {
        model: "Company",
        key: "id_company",
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
