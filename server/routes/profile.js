import express from "express";
import { uploadProfilePicture, updateProfilePicture, deleteProfilePicture } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/profile-picture", authenticateUser, uploadProfilePicture); // First-time upload
router.put("/profile-picture", authenticateUser, updateProfilePicture); // Update existing
router.delete("/profile-picture", authenticateUser, deleteProfilePicture); // Remove profile picture

export default router;
