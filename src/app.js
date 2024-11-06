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
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(config.dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Database connection local
// mongoose
//   .connect(config.dbUri)
//   .then(() => logger.info("Connected to MongoDB"))
//   .catch((err) => logger.error("MongoDB connection error:", err));

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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
