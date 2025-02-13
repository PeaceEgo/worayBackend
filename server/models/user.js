import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema({
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" }, 
  transactionId: { type: String },
  paidAt: { type: Date },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phoneNumber: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    paymentHistory: [paymentHistorySchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);


export default User;
