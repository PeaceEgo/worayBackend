import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/user.js";
import cors from "cors";

dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",  
  methods: "GET,POST,PUT,DELETE",
  credentials: true,  
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((error) => console.log("MongoDB Connection Error:", error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
