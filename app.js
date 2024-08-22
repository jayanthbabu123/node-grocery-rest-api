require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes"); // Import the routes
const placeRoutes = require("./routes/PlaceRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const reviewRoutes = require("./routes/ReviewRoute");
const ProductsRoutes = require("./routes/ProductsRoutes");
const OrderProducts = require("./routes/OrderProducts");
const laptopRoutes = require("./routes/LaptopRoutes"); // Import the laptop routes
const auth = require("./middleware/auth");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // Use CORS
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas:", err));

// Use the User routes
app.use("/api/users", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/products", ProductsRoutes);
app.use("/api/products/order", OrderProducts);
app.use("/api", bookingRoutes);
app.use("/api/laptops", laptopRoutes); // Use the laptop routes
app.use("/api", auth, reviewRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
