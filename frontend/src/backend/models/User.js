// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String },   // optional: Firebase UID if you want
  name: { type: String },
  email: { type: String, required: true, unique: true },
  collectionName: { type: String }, // store dynamic collection for convenience
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
