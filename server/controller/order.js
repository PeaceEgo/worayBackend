// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const orders = await Order.find().populate("userId", "fullName email");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };
  
  // Get user orders (Regular user)
  export const getUserOrders = async (req, res) => {
    try {
      const { userId } = req;
      const orders = await Order.find({ userId });
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };
  