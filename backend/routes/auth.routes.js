const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const SECRET_KEY = "scms_secret_key_2024";

// Register (for creating initial users)
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name, role });
    res.json({ message: "User created successfully", success: true });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
   
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, role: user.role, name: user.name }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get current user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
