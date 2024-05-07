const express = require('express');
const serverless = require('serverless-http');
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("../routes/UserRoutes"); // Import the routes
const placeRoutes = require("../routes/PlaceRoutes");
const bookingRoutes = require("../routes/BookingRoutes");
const reviewRoutes = require("../routes/ReviewRoute");
const ProductsRoutes = require("../routes/ProductsRoutes");
const auth = require("../middleware/auth");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("../swagger.yaml");

app.use(cors()); // Use CORS
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas:", err));

// Use the User routes
app.use("/.netlify/functions/expressFunction/api/users", userRoutes);
app.use("/.netlify/functions/expressFunction/api/places", placeRoutes);
app.use("/.netlify/functions/expressFunction/api/products", ProductsRoutes);
app.use("/.netlify/functions/expressFunction/api", bookingRoutes);
app.use("/.netlify/functions/expressFunction/api", auth, reviewRoutes);
app.use("/.netlify/functions/expressFunction/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports.handler = serverless(app);
