// routes/projectRoutes.js - WITH AUTHENTICATION
const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');
const authenticateToken = require('../middleware/authMiddleware');

// Public routes - anyone can view
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);

// Protected routes - require authentication
router.post('/', authenticateToken, controller.createProject);
router.put('/:id', authenticateToken, controller.updateProject);
router.delete('/:id', authenticateToken, controller.deleteProject);
router.delete('/', authenticateToken, controller.deleteAllProjects);

module.exports = router;