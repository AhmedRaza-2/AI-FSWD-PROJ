// routes/emails.js
const express = require("express");
const router = express.Router();
const { mongoose } = require("../db"); // will import mongoose instance
const EmailSchema = require("../models/Email").schema; // reuse schema
const User = require("../models/User");

// helper: build safe collection name
function safeCollectionName(userEmail) {
  return "emails_" + userEmail.replace(/[@.]/g, "_");
}

// helper: get or create dynamic model for this collection
function getEmailModelForCollection(collectionName) {
  // if model already compiled (registered), reuse it
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }
  // compile a new model bound to collectionName
  return mongoose.model(collectionName, EmailSchema, collectionName);
}

/**
 * POST /api/emails
 * Accept JSON: { userEmail, subject, body, sender, urls, prediction, confidence }
 * (This is what your Python Flask app posts to.)
 */
router.post("/", async (req, res) => {
  try {
    const payload = req.body || {};
    const userEmail = payload.userEmail || payload.email;
    if (!userEmail) {
      console.warn("POST /api/emails missing userEmail in payload:", payload);
      return res.status(400).json({ error: "userEmail is required" });
    }

    const collectionName = safeCollectionName(userEmail);
    const EmailModel = getEmailModelForCollection(collectionName);

    // normalise fields
    const doc = {
      userEmail,
      subject: payload.subject || "",
      body: payload.body || "",
      sender: payload.sender || "",
      urls: payload.urls || payload.url_results || [],
      prediction: payload.prediction ?? payload.label ?? payload.email_prediction ?? 0,
      confidence: payload.confidence ?? payload.confidence ?? payload.email_confidence ?? 0,
      timestamp: new Date()
    };

    const saved = await EmailModel.create(doc);

    // optional: ensure we have a user record with collectionName
    await User.findOneAndUpdate(
      { email: userEmail },
      { email: userEmail, collectionName },
      { upsert: true, new: true }
    );

    console.log(`✅ Saved email for ${userEmail} into ${collectionName} (_id: ${saved._id})`);
    res.status(201).json({ ok: true, id: saved._id });
  } catch (err) {
    console.error("POST /api/emails error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/emails/:email
 * Returns array of email docs from this user's collection (newest first).
 */
router.get("/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    if (!userEmail) return res.status(400).json({ error: "Missing email param" });

    const collectionName = safeCollectionName(userEmail);
    const EmailModel = getEmailModelForCollection(collectionName);

    // fetch recent first
    const docs = await EmailModel.find({}).sort({ timestamp: -1 }).limit(1000).lean();

    console.log(`🔁 Fetched ${docs.length} emails for ${userEmail} from ${collectionName}`);

    res.json(docs);
  } catch (err) {
    console.error("GET /api/emails/:email error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Optional test route
 */
router.get("/", async (req, res) => {
  res.json({ ok: true, message: "emails route alive. Use /api/emails/:email to fetch and POST /api/emails to save." });
});

module.exports = router;
