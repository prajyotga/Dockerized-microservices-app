require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("./src/middlewares/authMiddlewares");

const app = express();

// ==========================
// Middlewares
// ==========================

app.use(cors());


// ==========================
// Auth Service (Public Routes)
// ==========================




app.use((req, res, next) => {
  console.log("gatweway  :", req.method, req.originalUrl);
  next();
});



app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,

    onProxyReq: (proxyReq, req) => {
      console.log("➡️ Proxying:", req.method, req.originalUrl);
    },

    onProxyRes: (proxyRes, req) => {
      console.log("⬅️ Response:", proxyRes.statusCode);
    },

    onError: (err) => {
      console.error("❌ Proxy Error:", err);
    },
  })
);

// ==========================
// Restaurant Service
// ==========================

app.use(
  "/api/restaurants",

  createProxyMiddleware({
    target: `${process.env.RESTAURANT_SERVICE}/api/restaurants`,
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req) => {
        if (req.user) {
          proxyReq.setHeader("x-user-id", req.user.id);
          proxyReq.setHeader("x-user-email", req.user.email || "");
        }
      },
    },
  })
);
// ==========================
// Backend Service
// ==========================
// Public Menu APIs





app.use(
  "/api/menu",
  createProxyMiddleware({
    target: `${process.env.MENU_SERVICE}/api/menu`,
    changeOrigin: true,
  })
);

// Protected Cart APIs
app.use(
  "/api/cart",
  authMiddleware,
  createProxyMiddleware({
    target: `${process.env.CART_SERVICE}/api/cart`,
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req) => {
        proxyReq.setHeader("x-user-id", req.user.id);
        proxyReq.setHeader("x-user-email", req.user.email || "");
      },
    },
  })
);

// Protected Order APIs
app.use(
  "/api/orders",
  authMiddleware,
  createProxyMiddleware({
    target: `${process.env.ORDER_SERVICE}/api/orders`,
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req) => {
        proxyReq.setHeader("x-user-id", req.user.id);
        proxyReq.setHeader("x-user-email", req.user.email || "");
      },
    },
  })
);

// Protected Payment APIs
app.use(
  "/api/payment",
  authMiddleware,
  createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE,
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req) => {
        proxyReq.setHeader("x-user-id", req.user.id);
      },
    },
  })
);


// ==========================
// Health Check
// ==========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Gateway is running",
  });
});

// ==========================
// Start Server
// ==========================

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});