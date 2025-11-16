const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    const user = new User({ uid, name, email });
    await user.save();

    res.status(201).json({ message: "User saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
