const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "designlogin",
  port: 3306,
});

const app = express();

app.use(express.json());
app.use(cors());

// Signup endpoint
app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if the user already exists
  const checkUserQuery = "SELECT * FROM Users WHERE email = ? OR username = ?";
  db.query(checkUserQuery, [email, username], (err, result) => {
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

    // Insert new user into the database
    const insertUserQuery =
      "INSERT INTO Users (email, username, password) VALUES (?, ?, ?)";
    db.query(insertUserQuery, [email, username, password], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred while adding the user." });
      }

      res.status(201).json({ message: "User signed up successfully!" });
    });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
