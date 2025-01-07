const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MySQL connection for notes
const notesDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes_app",
});

notesDb.connect((err) => {
  if (err) throw err;
  console.log("MySQL (Notes) connected...");
});

// MySQL connection for login/signup
const authDb = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "designlogin",
  port: 3306,
});

// ---------------- Notes Routes ----------------
const notesRouter = express.Router();

// Get all notes
notesRouter.get("/", (req, res) => {
  notesDb.query("SELECT * FROM notes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new note
notesRouter.post("/", (req, res) => {
  const { id, title, content, createdAt } = req.body;
  const sql =
    "INSERT INTO notes (id, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, NULL)";
  notesDb.query(sql, [id, title, content, createdAt], (err, result) => {
    if (err) throw err;
    res.json({ message: "Note added successfully" });
  });
});

// Delete a note
notesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  notesDb.query("DELETE FROM notes WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Note deleted successfully" });
  });
});

// Update a note
notesRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, updatedAt } = req.body;
  const sql =
    "UPDATE notes SET title = ?, content = ?, updatedAt = ? WHERE id = ?";
  notesDb.query(sql, [title, content, updatedAt, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Note updated successfully" });
  });
});

app.use("/notes", notesRouter);

// ---------------- Login Route ----------------
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql =
    "SELECT * FROM Users WHERE email = ? AND username = ? AND password = ?";
  authDb.query(sql, [email, username, password], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res
          .status(401)
          .json({
            message: "Login failed. Invalid email, username, or password.",
          });
      }
    }
  });
});

app.use("/auth", authRouter);

// ---------------- Signup Route ----------------
authRouter.post("/signup", (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const checkUserQuery = "SELECT * FROM Users WHERE email = ? OR username = ?";
  authDb.query(checkUserQuery, [email, username], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred while checking user existence." });
    }

    if (result.length > 0) {
      return res
        .status(409)
        .json({
          message: "User already exists with the provided email or username.",
        });
    }

    const insertUserQuery =
      "INSERT INTO Users (email, username, password) VALUES (?, ?, ?)";
    authDb.query(insertUserQuery, [email, username, password], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred while adding the user." });
      }

      res.status(201).json({ message: "User signed up successfully!" });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
