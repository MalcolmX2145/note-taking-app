import express from "express";
import cookieParser from "cookie-parser";
import { validateToken } from "./src/middlewares/validateToken.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


// Dynamic origin function for CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === "production") {
      // Allow only the production URL in production mode
      if (origin === process.env.PRODUCTION_URL) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      // Allow only the development URL in development mode
      if (origin === process.env.DEVELOPMENT_URL) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// import routes
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.route.js";
import notesRoutes from "./src/routes/notes.routes.js";


// server the routes
app.use("/api/auth", authRoutes);
app.use("/api/user", validateToken, userRoutes);
app.use("/api/notes", validateToken, notesRoutes);


// listen to the PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
