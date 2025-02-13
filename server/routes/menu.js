import express from "express";
import {
  addMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menu.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);

// Protected Routes (Admins Only)
router.post("/", authenticateUser, authorizeAdmin, addMenuItem);
router.put("/:id", authenticateUser, authorizeAdmin, updateMenuItem);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteMenuItem);

export default router;
