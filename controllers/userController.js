const User = require('../models/userModel');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found in the database" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// GET a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: `User not found with ID: ${req.params.id}` });
    }

    res.json(user);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// CREATE a new user
exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ message: "Failed to create user: " + err.message });
  }
};

// UPDATE an existing user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: `No user found to update with ID: ${req.params.id}` });
    }

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Failed to update user: " + err.message });
  }
};

// DELETE a single user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: `No user found to delete with ID: ${req.params.id}` });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Failed to delete user: " + err.message });
  }
};

// DELETE all users
exports.deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No users found to delete" });
    }

    res.json({ message: "All users deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete all users: " + err.message });
  }
};
