const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// PROTECTED
router.post('/', auth, projectController.createProject);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);
router.delete('/', auth, projectController.deleteAllProjects);

module.exports = router;
