import jwt from "jsonwebtoken";
import User from "../models/user.js";

//  Middleware to verify user authentication
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

//  Middleware to check if the user is an admin
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
