const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Create an instance of Express
const app = express();

// Parse incoming JSON requests
app.use(express.json());

app.use(cors()); // Use CORS middleware

// Create a MySQL database connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Ekajjaz@217",
  database: "crud",
});

// Define the login route
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM crud.login WHERE email = ? AND password = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error("MySQL Query Error:", err); // Log the error for debugging
      return res
        .status(500)
        .json({ message: "An error occurred while querying the database" });
    }
    if (data.length > 0) {
      return res.json("Login Successful");
    } else {
      return res.json("No Record");
    }
  });
});

// Start the server
app.listen(8081, () => {
  console.log("Listening on port 8081");
});
