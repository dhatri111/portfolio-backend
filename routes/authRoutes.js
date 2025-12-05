// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST - Sign Up (Register new user)
// URL: /api/auth/signup
router.post('/signup', authController.signUp);

// POST - Sign In (Login user)
// URL: /api/auth/signin
router.post('/signin', authController.signIn);

// POST - Sign Out (Logout user)
// URL: /api/auth/signout
router.post('/signout', authController.signOut);

module.exports = router;