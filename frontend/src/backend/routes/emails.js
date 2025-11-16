const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
const mongoose = require("mongoose");

// Test Route
router.get("/test", (req, res) => {
  res.json({ status: "ok", message: "Email API running" });
});

// Save email (from Flask)
router.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;

    if (!userEmail) {
      return res.status(400).json({ error: "userEmail is required" });
    }

    const saved = await Email.create({
      userEmail,
      subject: req.body.subject || "",
      body: req.body.body || "",
      sender: req.body.sender || "",
      urls: req.body.urls || [],
      prediction: req.body.prediction || 0,
      confidence: req.body.confidence || 0
    });

    res.status(201).json({ status: "ok", id: saved._id });
  } catch (err) {
    console.error("Error saving email:", err);
    res.status(500).json({ error: err.message });
  }
});


// Get emails for a user
router.get("/:email", async (req, res) => {
  const userEmail = req.params.email;
  if (!userEmail) return res.status(400).json({ error: "Missing email" });

  // sanitize email to use in collection name
  const collectionName = "emails_" + userEmail.replace(/[@.]/g, "_");
  const userCollection = mongoose.connection.collection(collectionName);

  try {
    const emails = await userCollection.find({}).toArray();
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
