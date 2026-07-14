const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================

app.use(cors({
  origin: "*"
}));
app.use(express.json());
const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
console.log("Loading auth routes...");

// ================= ROUTES =================

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Job Routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

// Application Routes
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

console.log("Application route registered");

// ================= HOME ROUTES =================

app.get("/", (req, res) => {
  res.send("THIS IS MY NEW SERVER - VERSION 2");
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

app.put("/puttest", (req, res) => {
  res.json({
    message: "PUT is working",
  });
});

// ================= DATABASE =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});