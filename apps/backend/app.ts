import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { globalErrorHandler } from "./app/api/middlewares/handleError";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);
app.use(globalErrorHandler);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "CRM System API",
    version: "1.0.0",
    status: "running",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
// app.use("(.*)", (req, res) => {
//   res.status(404).json({
//     error: "Route not found",
//     path: req.originalUrl,
//     method: req.method,
//   });
// });

export default app;
