const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Add new user after Firebase registration
router.post("/", async (req, res) => {
  try {
    const { uid, name, email } = req.body;
    const newUser = new User({ uid, name, email });
    await newUser.save();
    res.status(201).json({ message: "User saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
