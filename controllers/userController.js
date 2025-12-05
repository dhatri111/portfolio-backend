// controllers/userController.js - WITH PASSWORD HASHING
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// GET all users (exclude passwords)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found in the database" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// GET a single user by ID (exclude password)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

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

// CREATE a new user (with password hashing)
exports.addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      created: new Date(),
      updated: new Date()
    });
    
    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ message: "User created successfully", user: userResponse });
  } catch (err) {
    res.status(400).json({ message: "Failed to create user: " + err.message });
  }
};

// UPDATE an existing user by ID (with password hashing if password is updated)
exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body, updated: new Date() };

    // If password is being updated, hash it
    if (updateData.password && updateData.password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    } else {
      // Remove password field if it's empty
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');

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