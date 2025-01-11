import express from "express";
import cookieParser from "cookie-parser";
import { validateToken } from "./src/middlewares/validateToken.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://note-taking-app-jiyw.onrender.com" // Deployed frontend URL
        : "http://localhost:5173", // Local development frontend URL
    credentials: true, // Allow sending cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  })
);

const __dirname = path.resolve();

// import routes
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.route.js";
import notesRoutes from "./src/routes/notes.routes.js";

app.get("/tokens", (req, res) => {
  res.json({ tokens: req.cookies });
});

// server the routes
app.use("/api/auth", authRoutes);
app.use("/api/user", validateToken, userRoutes);
app.use("/api/notes", validateToken, notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend2/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend2", "dist", "index.html"));
  });
}

// listen to the PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
