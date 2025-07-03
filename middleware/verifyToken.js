const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(403).json({ error: "Authorization header required" });

  // Format should be: Bearer <token>
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token not found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
