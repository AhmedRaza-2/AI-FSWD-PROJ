const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/save", async (req, res) => {
  try {
    const { userEmail, emailContent, prediction, score } = req.body;

    const safeName = userEmail.replace(/[@.]/g, "_");
    const collectionName = `emails_${safeName}`;

    const DynamicEmailModel = mongoose.model(
      collectionName,
      new mongoose.Schema({
        emailContent: String,
        prediction: String,
        score: Number,
        createdAt: { type: Date, default: Date.now }
      }),
      collectionName
    );

    const saved = await DynamicEmailModel.create({
      emailContent,
      prediction,
      score
    });

    res.json({ message: "Saved!", data: saved });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: "Save failed" });
  }
});
