const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const contactRoutes = require('./routes/api/contact');

const app = express();
const PORT = process.env.PORT || 9000;

// Database setup
const dbPath = path.resolve(__dirname, 'db', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create tables if they don't exist - schema will be in schema.sql
    // For now, we assume the table might be created by schema.sql execution separately
    // or by the route handler if it includes robust table creation logic.
    // Example: db.run('CREATE TABLE IF NOT EXISTS contacts (...)');
    // This part will be more robust once db/schema.sql is implemented.
  }
});

// Middleware for parsing JSON request bodies
app.use(express.json());

// API routes
app.use('/api/contact', contactRoutes);

// Serve static files from the React app build directory
// This assumes the React app is in a 'client' subdirectory and builds to 'client/build'
app.use(express.static(path.join(__dirname, 'client', 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
