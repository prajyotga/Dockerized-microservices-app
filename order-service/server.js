require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./src/config/db");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();

connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Order Service Running",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Order Service running on ${process.env.PORT}`);
});