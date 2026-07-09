const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const testUpload = require("./routes/testupload");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/test-upload", testUpload);
app.use("/api/orders", orderRoutes);
app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  next();
});
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();