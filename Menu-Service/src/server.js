const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Menu Service is running",
  });
});

const menuRoutes = require("./routes/menuRoutes");

app.use((req, res, next) => {
  console.log("Menu Service:", req.method, req.originalUrl);
  next();
});

app.use("/api/menu", menuRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Menu Service running on ${process.env.PORT}`);
});