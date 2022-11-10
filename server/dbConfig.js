// import * as pg from "pg";
import * as dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

// const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
  }
);

export default sequelize;

// const { Pool } = pg.default;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DBNAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// export default pool;
