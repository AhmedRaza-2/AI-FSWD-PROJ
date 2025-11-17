// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create or update user record and ensure collectionName stored
router.post("/", async (req, res) => {
  try {
    const { email, name, uid } = req.body;
    if (!email) return res.status(400).json({ error: "email required" });

    const safe = email.replace(/[@.]/g, "_");
    const collectionName = `emails_${safe}`;

    const user = await User.findOneAndUpdate(
      { email },
      { email, name, uid, collectionName },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`🧾 User upserted: ${email} -> ${collectionName}`);
    res.json({ ok: true, user });
  } catch (err) {
    console.error("users route error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
