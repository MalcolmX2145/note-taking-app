import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateToken = (req, res, next) => {
  try {
    // Get the access token from either the Authorization header or cookies
    //  const authHeader = req.headers["authorization"];
    //  const accessToken = authHeader ? authHeader.split('.')[1] : req.cookies['access-token'];
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
      return res.status(403).json({ message: "You do not have access" });
    }

    // Verify the access token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      // Attach user to the request object
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};