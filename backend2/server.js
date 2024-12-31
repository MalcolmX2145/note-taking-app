const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "notes_app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Get all notes
app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new note
app.post("/notes", (req, res) => {
  const { id, title, content, createdAt } = req.body;
  const sql =
    "INSERT INTO notes (id, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, NULL)";
  db.query(sql, [id, title, content, createdAt], (err, result) => {
    if (err) throw err;
    res.json({ message: "Note added successfully" });
  });
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM notes WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Note deleted successfully" });
  });
});

// Update a note
app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, updatedAt } = req.body;
  const sql =
    "UPDATE notes SET title = ?, content = ?, updatedAt = ? WHERE id = ?";
  db.query(sql, [title, content, updatedAt, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Note updated successfully" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
