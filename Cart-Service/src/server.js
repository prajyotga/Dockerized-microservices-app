const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cart Service is running",
  });
});

const cartRoutes = require("./routes/cartRoutes");

app.use("/api/cart", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Cart Service running on ${process.env.PORT}`);
});