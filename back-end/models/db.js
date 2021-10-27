import { Sequelize } from "sequelize";
import { config } from "../config/configInApp/config.js";
var database = 1; // 0 = Localhost database  ||  1 = Heroku database
var heroku = 0;
let sequelizeOb;
if (!process.env.DATABASE_URL) {
  heroku = 1;
}

if (database == 0) {
  sequelizeOb = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: "postgres",
      define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
      },
    }
  );
} else {
  if (heroku == 1) {
    sequelizeOb = new Sequelize(
      process.env.DATABASE,
      process.env.USER,
      process.env.PASSWORD,
      {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        define: {
          freezeTableName: true,
        },
      }
    );
  } else {
    sequelizeOb = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        freezeTableName: true,
      },
    });
  }
}

export const sequelize = sequelizeOb;
