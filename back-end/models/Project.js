import pkg from 'sequelize';
const { Model, DataTypes } = pkg;
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
      allowNull: false
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

export default Project;
