const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// SIGN UP
// =========================
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashed
        });

        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =========================
// SIGN IN
// =========================
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =========================
// CRUD Operations
// =========================

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

exports.addUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
};

exports.updateUser = async (req, res) => {
    const update = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(update);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};

exports.deleteAllUsers = async (req, res) => {
    await User.deleteMany();
    res.json({ message: "All users deleted" });
};
