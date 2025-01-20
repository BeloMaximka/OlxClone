// src/database.ts
import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'olx',
  waitForConnections: true,
  queueLimit: 0,
};

let pool: Pool;

try {
  pool = mysql.createPool(dbConfig);
  console.log('Database connection pool created successfully.');
} catch (error) {
  console.error('Error creating database connection pool:', error);
  process.exit(1);
}

export default pool;
