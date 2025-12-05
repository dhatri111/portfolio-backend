// routes/serviceRoutes.js - WITH AUTHENTICATION
const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  deleteAllServices
} = require('../controllers/serviceController');
const authenticateToken = require('../middleware/authMiddleware');

// Public routes - anyone can view
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes - require authentication
router.post('/', authenticateToken, addService);
router.put('/:id', authenticateToken, updateService);
router.delete('/:id', authenticateToken, deleteService);
router.delete('/', authenticateToken, deleteAllServices);

module.exports = router;