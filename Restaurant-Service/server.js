require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./src/config/db");
const restaurantRoutes = require("./src/routes/restaurantRoutes");

const app = express();

// ==========================
// Middlewares
// ==========================

app.use(cors());
app.use(express.json());

// ==========================
// Database Connection
// ==========================




connectDb();

// ==========================
// Health Check
// ==========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Restaurant Service is running",
  });
});

// ==========================
// Routes
// ==========================

app.use("/api/restaurants", restaurantRoutes);

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});