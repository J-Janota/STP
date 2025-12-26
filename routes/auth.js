const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const session = require('express-session');

// REGISTER
router.post("/auth/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const exists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (exists.rows.length) return res.status(400).json({ error: "Email exists" });

    
    const hash = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      "INSERT INTO users(email, password_hash, username) VALUES($1, $2, $3) RETURNING id",
      [email, hash, username]
    );
    const user = result.rows[0];


    req.session.userId = user.id;
    
    res.json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });

  }
});

// LOGIN
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!result.rows.length) return res.status(400).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    req.session.userId = user.id;
    
    res.json({ message: "Login successful", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
