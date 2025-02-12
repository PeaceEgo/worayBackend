import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    paymentStatus: { type: String, default: "pending" }, 
    orderStatus: { type: String, default: "pending" }, 
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
