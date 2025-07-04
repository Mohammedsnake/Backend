const express = require("express");
const router = express.Router();

const { register, login, profile } = require("./authController");
const verifyToken = require("../middleware/verifyToken");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/profile", verifyToken, profile);

module.exports = router;
