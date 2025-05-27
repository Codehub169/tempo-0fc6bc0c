const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();

// Database path - relative to the project root
const dbPath = path.resolve(__dirname, '../../db/database.sqlite');

// POST /api/contact - Handle contact form submission
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error('Error opening database for contact form:', err.message);
      return res.status(500).json({ message: 'Failed to connect to the database.' });
    }
  });

  // The 'contacts' table schema will be defined in db/schema.sql
  // For now, we assume it exists or will be created.
  // A more robust approach would be to ensure table creation here or in server.js startup.
  const insertSql = `INSERT INTO contacts (name, email, message, submitted_at) VALUES (?, ?, ?, datetime('now'))`;

  db.run(insertSql, [name, email, message], function(err) {
    if (err) {
      console.error('Error inserting contact data:', err.message);
      db.close();
      return res.status(500).json({ message: 'Failed to save your message. Please try again.' });
    }
    db.close();
    res.status(201).json({ message: 'Message received! We will get back to you soon.', id: this.lastID });
  });
});

module.exports = router;
