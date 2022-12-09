import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const { Pool } = pg.default;

const pool = new Pool({
  connectionString: process.env.DB_CONNECTIONSTRING,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DBNAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

export default pool;
