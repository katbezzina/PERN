import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const { Pool } = pg.default;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DBNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
