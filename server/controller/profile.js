import User from "../models/User.js";

// Upload Profile Picture (First-time upload)
export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const imageUrl = req.body.imageUrl; // URL from Dropbox (to be implemented later)

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePicture = imageUrl;
    await user.save();

    res.status(201).json({ message: "Profile picture uploaded successfully", imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Profile Picture (Replace existing one)
export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const newImageUrl = req.body.imageUrl;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePicture = newImageUrl; // Replace old picture with new one
    await user.save();

    res.status(200).json({ message: "Profile picture updated successfully", imageUrl: newImageUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Profile Picture
export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePicture = null; // Remove profile picture
    await user.save();

    res.status(200).json({ message: "Profile picture deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
