const express = require("express");
const { registerAdmin, login } = require("../controllers/authController");
const router = express.Router();

// Register route (örnek: Admin)
router.post("/register/admin", registerAdmin);

// Login route
router.post("/login", login);

module.exports = router;
