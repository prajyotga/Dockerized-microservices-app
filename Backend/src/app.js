const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const authRoutes = require("./routes/authRoutes");   // Removed
// const userRoutes = require("./routes/userRoutes");
// const restaurantRoutes = require("./routes/restaurantRoutes"); // Remove after Restaurant-Service is working
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);   // Removed
// app.use("/api/users", userRoutes);

// app.use("/api/restaurants", restaurantRoutes); // Remove after testing Restaurant-Service

app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;