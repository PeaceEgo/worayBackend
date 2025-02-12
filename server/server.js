import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/user.js";



dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection (Using MongoDB Atlas Cluster)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((error) => console.log("MongoDB Connection Error:", error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
