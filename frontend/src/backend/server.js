const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Use MongoDB Atlas connection string
mongoose
    .connect(
        "mongodb+srv://muhidbalouch_db_user:d9022rw04iCMveX1@cluster0.6znbq7c.mongodb.net/loginDB?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.log("❌ MongoDB connection error:", err));

app.use("/api/user", userRoutes);

app.listen(5000, () => console.log("Server Running on port 5000"));
