const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const transporterRoutes = require("./routes/transporterRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./utils/errorHandler");
const logger = require("./utils/logger");
const searchRoutes = require("./routes/searchRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const app = express();

// Database connection
mongoose
  .connect(config.dbUri)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transporters", transporterRoutes);
app.use("/api", orderRoutes);
app.use("/search", searchRoutes);
app.use("/api", notificationRoutes);
// Error handling
app.use(errorHandler);

module.exports = app;
