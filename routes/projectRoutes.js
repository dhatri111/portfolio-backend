const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);

// PROTECTED
router.post('/', auth, controller.createProject);
router.put('/:id', auth, controller.updateProject);
router.delete('/:id', auth, controller.deleteProject);
router.delete('/', auth, controller.deleteAllProjects);

module.exports = router;
