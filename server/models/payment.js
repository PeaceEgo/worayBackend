import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: { type: String, required: true }, // e.g., "card", "paypal"
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" }, // "success", "failed", "pending"
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);



export default Payment;
