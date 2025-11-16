const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true }, 
  subject: String,
  body: String,
  sender: String,
  urls: { type: Array, default: [] },
  prediction: Number,
  confidence: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Email", EmailSchema);
