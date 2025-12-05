// routes/contactRoutes.js - WITH AUTHENTICATION
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authenticateToken = require('../middleware/authMiddleware');

// Public routes - anyone can view
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);

// Protected routes - require authentication
router.post('/', authenticateToken, contactController.createContact);
router.put('/:id', authenticateToken, contactController.updateContact);
router.delete('/:id', authenticateToken, contactController.deleteContact);
router.delete('/', authenticateToken, contactController.deleteAllContacts);

module.exports = router;