require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("./src/middlewares/authMiddleware");

const app = express();

// ==========================
// Middlewares
// ==========================

app.use(cors());
app.use(express.json());

// ==========================
// Auth Service (No JWT Required)
// ==========================

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,
  })
);

// ==========================
// Backend Service (JWT Protected)
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
  res.json({
    success: true,
    message: "API Gateway is running",
  });
});

// ==========================

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on port ${process.env.PORT}`);
});