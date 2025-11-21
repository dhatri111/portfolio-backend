// Import Express framework
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import controller functions for handling service routes
const {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  deleteAllServices
} = require('../controllers/serviceController');


// Define all Service API routes


// GET all services
// URL: /api/services
router.get('/', getAllServices);

// GET a single service by ID
// URL: /api/services/:id
router.get('/:id', getServiceById);

// CREATE a new service
// URL: /api/services
router.post('/', addService);
 <Route path="/services/new" element={<ServiceForm />} />

// UPDATE an existing service by ID
// URL: /api/services/:id
router.put('/:id', updateService);

// DELETE a specific service by ID
// URL: /api/services/:id
router.delete('/:id', deleteService);

// DELETE all services
// URL: /api/services
router.delete('/', deleteAllServices);

// Export the router to be used in server.js
module.exports = router;
