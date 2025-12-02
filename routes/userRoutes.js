// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Define all users API routes


// GET all users
// URL: /api/users
router.get('/', userController.getAllUsers);
// GET a single user by ID
// URL: /api/users/:id
router.get('/:id', userController.getUserById);
// CREATE a new user
// URL: /api/users
router.post('/', userController.addUser);
// UPDATE an existing user by ID
// URL: /api/users/:id
router.put('/:id', userController.updateUser);
// DELETE a specific user by ID
// URL: /api/users/:id
router.delete('/:id', userController.deleteUser);
// DELETE all users
// URL: /api/users
router.delete('/', userController.deleteAllUsers);

// Export router properly
module.exports = router;
