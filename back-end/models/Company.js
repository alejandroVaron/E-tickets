import { Model, DataTypes } from "sequelize";
import { sequelize } from "../models/db.js";

class Company extends Model {
  static associate() {}
}
Company.init(
  {
    id_company: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    company_name: {
      type: DataTypes.STRING,
    },
    company_nit: {
      type: DataTypes.STRING,
    },
    company_cellphone: {
      type: DataTypes.STRING,
    },
    company_address: {
      type: DataTypes.STRING,
    },
    company_email: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Company",
  }
);

module.exports = Company;
