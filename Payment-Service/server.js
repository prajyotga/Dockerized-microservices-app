require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./src/config/db");
const paymentRoutes = require("./src/routes/paymentRoutes");

const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Payment Service:", req.method, req.originalUrl);
  next();
});

app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`Payment Service running on ${PORT}`);
});