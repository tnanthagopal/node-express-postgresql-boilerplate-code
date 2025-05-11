import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
  // // Pool tuning options:
  // max: 20, // maximum number of clients in the pool
  // //look into PgBouncer
  // idleTimeoutMillis: 30000, // 30 seconds: time a client must sit idle before being closed
  // connectionTimeoutMillis: 2000, // 2 seconds: time to wait for a new connection before throwing error
});

pool.on("connect", (e) => {
  console.log("connected");
});
pool.on("acquire", () => {
  console.log("Connection acquired from pool (every time a query runs)");
});
export default pool;
