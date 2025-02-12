import express from "express";
import { getAllOrders, getUserOrders } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserOrders); // User can fetch their own orders
router.get("/all", protect, admin, getAllOrders); // Admin can fetch all orders

export default router;
