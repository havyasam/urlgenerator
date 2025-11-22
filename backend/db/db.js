// db.js
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});


pool.connect()
  .then(client => {
    console.log("Connected to Postgres successfully!");
    client.release();
  })
  .catch(err => {
    console.error("Database connection failed:", err.stack);
  });

export default pool;
