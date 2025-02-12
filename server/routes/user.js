import express from "express";
import { registerUser, loginUser } from "../controller/user.js";

const router = express.Router();

router.post("/signup", registerUser); // User registration
router.post("/signin", loginUser); // User login

export default router;
