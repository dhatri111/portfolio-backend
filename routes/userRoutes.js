// routes/userRoutes.js - WITH AUTHENTICATION
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Public routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);


// Protected routes - only edit and delete require authentication
router.post('/', authenticateToken, userController.addUser); 
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.delete('/', authenticateToken, userController.deleteAllUsers);

module.exports = router;