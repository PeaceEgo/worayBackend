import express from "express";
import { createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createMenuItem);
router.put("/:id", protect, admin, updateMenuItem);
router.delete("/:id", protect, admin, deleteMenuItem);

export default router;
