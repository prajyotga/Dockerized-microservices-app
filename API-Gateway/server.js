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
app.use(express.json());

// ==========================
// Auth Service (Public Routes)
// ==========================

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,
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

app.use(
  "/api",
  authMiddleware,
  createProxyMiddleware({
    target: process.env.BACKEND_SERVICE,
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});