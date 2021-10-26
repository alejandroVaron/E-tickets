import { Model, DataTypes } from "sequelize";
import { sequelize } from "../models/db.js";

class Project extends Model {
  static associate() {}
}
Project.init(
  {
    id_project: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    id_company: {
      type: DataTypes.INTEGER,
      references: {
        model: "Company",
        key: "id_company",
      },
    },
    project_description: {
      type: DataTypes.STRING,
    },
    project_image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Project",
  }
);

module.exports = Project;
