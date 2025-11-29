const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// SIGN UP
// =========================
exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ success: false, message: "User already exists." });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ firstname, lastname, email, password: hashed });

        res.status(201).json({ success: true, message: "User created successfully", data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// =========================
// SIGN IN
// =========================
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ success: true, message: "Login successful", data: user, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// =========================
// CRUD Operations
// =========================
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, message: "User updated successfully", data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.json({ success: true, message: "All users deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
