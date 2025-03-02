import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(" Database connection failed:", err.message);
  } else {
    console.log(" Database connected successfully!");
    connection.release();
  }
});
const createTables = async () => {
    try {
      await pool.promise().query(`
        CREATE TABLE IF NOT EXISTS authors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          bio TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
  
      await pool.promise().query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
     `);
     
  
      console.log(" Tables checked and ready!");
    } catch (error) {
      console.error(" Error creating tables:", error);
    }
  };

// Run table creation on startup
createTables();

export default pool.promise();
