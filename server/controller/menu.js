import MenuItem from "../models/menu.js";


  // Add a new menu item (Admins Only)
 
export const addMenuItem = async (req, res) => {
  try {
  
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, description, price, category, image, availability } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    const newItem = new MenuItem({ name, description, price, category, image, availability });

    await newItem.save();
    res.status(201).json({ message: "Menu item added successfully!", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//  Get all menu items (Public)
 
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//  Get a single menu item by ID (Public)
 
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// Update a menu item (Admins Only)

export const updateMenuItem = async (req, res) => {
  try {
   
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, description, price, category, image, availability } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image, availability },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item updated successfully!", data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//  Delete a menu item (Admins Only)

export const deleteMenuItem = async (req, res) => {
  try {
    
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
