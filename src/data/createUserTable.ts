import pool from "../config/db";

const createUserTable: () => void = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY ,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  try {
    const results = await pool.query(queryText);
    console.log("Table created", results);
  } catch (e) {
    console.log(e, "error");
  }
};
export default createUserTable;
