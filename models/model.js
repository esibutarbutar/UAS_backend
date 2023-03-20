import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("penginapan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize, DataTypes };
