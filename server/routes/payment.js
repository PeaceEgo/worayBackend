import express from "express";
import { processPayment, getUserPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", processPayment); // Process payment
router.get("/:userId", getUserPayments); // Get payment history for a user

export default router;
