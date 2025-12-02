// Import the Express framework
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the Project controller to handle route logic
const controller = require('../controllers/projectController');


// Define all Project API routes

// GET all projects
// URL: /api/projects
router.get('/', controller.getAllProjects);

// GET a single project by ID
// URL: /api/projects/:id
router.get('/:id', controller.getProjectById);

// CREATE a new project
// URL: /api/projects
router.post('/', controller.createProject);

// UPDATE an existing project by ID
// URL: /api/projects/:id
router.put('/:id', controller.updateProject);

// DELETE a specific project by ID
// URL: /api/projects/:id
router.delete('/:id', controller.deleteProject);

// DELETE all projects
// URL: /api/projects
router.delete('/', controller.deleteAllProjects);

// Export the router to use in server.js
module.exports = router;
