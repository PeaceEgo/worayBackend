import MenuItem from "../models/MenuItem.js";

// Create a new menu item (Admin only)
export const createMenuItem = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, description, price, category, imageUrl } = req.body;
    const newItem = new MenuItem({ name, description, price, category, imageUrl });

    await newItem.save();
    res.status(201).json({ message: "Menu item created", newItem });
  } catch (error) {
    res.status(500).json({ message: "Error creating menu item", error });
  }
};

// Update a menu item (Admin only)
export const updateMenuItem = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied. Admins only." });

    const { id } = req.params;
    const updatedItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItem) return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item updated", updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item", error });
  }
};

// Delete a menu item (Admin only)
export const deleteMenuItem = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied. Admins only." });

    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error });
  }
};
