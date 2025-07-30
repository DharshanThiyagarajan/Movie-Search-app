require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Dharshibu@2311',
  database: process.env.DB_NAME || 'dharsh'
});

// Create movies table if not exists
async function initializeDB() {
  const conn = await pool.getConnection();
  await conn.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INT AUTO_INCREMENT PRIMARY KEY,
      imdbID VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      year VARCHAR(50),
      poster TEXT,
      genre VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  conn.release();
}
initializeDB();

// API Endpoints
app.post('/api/favorites', async (req, res) => {
  const { imdbID, title, year, poster, genre } = req.body;
  
  try {
    const conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO favorites (imdbID, title, year, poster, genre)
       VALUES (?, ?, ?, ?, ?)`,
      [imdbID, title, year, poster, genre]
    );
    conn.release();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM favorites ORDER BY createdAt DESC');
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));