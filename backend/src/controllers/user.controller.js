import prisma from "../utils/prisma.js";

// Get logged-in user
export const getUser = async (req, res) => {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // If user not found
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...user } = userData; // Exclude password
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    // Validate user ID
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userData = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If user not found
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...user } = userData; // Exclude password
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
