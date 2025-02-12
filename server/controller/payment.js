import Payment from "../models/payment.js";
import Order from "../models/order.js";

// Process Payment (Triggered after checkout)
export const processPayment = async (req, res) => {
  try {
    const { userId, orderId, amount, paymentMethod, transactionId } = req.body;

    // Ensure the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create payment record
    const payment = new Payment({
      user: userId,
      order: orderId,
      amount,
      paymentMethod,
      transactionId,
      status: "completed",
    });

    await payment.save();

    // Update order status to paid
    order.status = "paid";
    await order.save();

    res.status(201).json({ message: "Payment successful", payment });
  } catch (error) {
    res.status(500).json({ message: "Payment processing failed", error });
  }
};

// Get User Payment History
export const getUserPayments = async (req, res) => {
  try {
    const userId = req.params.userId;

    const payments = await Payment.find({ user: userId }).populate("order");

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving payment history", error });
  }
};
