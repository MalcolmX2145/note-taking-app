const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: "localhost",
  user: "root",
  password: "",
  database: "designlogin",
  port: 3306,
});

const app = express();

app.use(express.json());
app.use(cors());

// Login route requiring email, username, and password
app.post("/login", (req, res) => {
  const { email, username, password } = req.body;

  // Validate that all fields are provided
  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Login with email, username, and password
  const sql =
    "SELECT * FROM Users WHERE email = ? AND username = ? AND password = ?";
  db.query(sql, [email, username, password], (err, result) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
