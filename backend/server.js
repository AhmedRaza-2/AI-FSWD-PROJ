require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB().catch(err => {
  console.error("Fatal DB connect error:", err);
  process.exit(1);
});

const userRoutes = require("./routes/users");
const emailRoutes = require("./routes/emails");

app.use("/api/user", userRoutes);
app.use("/api/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("Phishing Node backend running ✅");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
