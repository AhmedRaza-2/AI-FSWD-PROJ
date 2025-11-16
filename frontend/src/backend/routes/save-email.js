const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail || req.body.email;
    const prediction = req.body.prediction || req.body.label;


    // Sanitize collection name
    if (!userEmail) return res.status(400).json({ error: "userEmail missing" });
        const collectionName = "emails_" + userEmail.replace(/[@.]/g, "_");

    const userCollection = mongoose.connection.collection(collectionName);

    await userCollection.insertOne({
      subject,
      body,
      sender,
      urls,
      prediction,
      confidence,
      timestamp: new Date()
    });

    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
