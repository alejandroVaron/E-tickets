import pkg from "sequelize";
const { Model, DataTypes } = pkg;
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
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_company: {
      type: DataTypes.INTEGER,
      references: {
        model: "Company",
        key: "id_company",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
