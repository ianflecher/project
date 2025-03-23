import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this exists in .env
  ssl: { rejectUnauthorized: false }, // Required for Neon PostgreSQL
});

export default pool;
