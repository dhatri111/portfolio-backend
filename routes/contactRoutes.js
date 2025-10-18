// Import Express framework
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the Contact controller to handle logic
const contactController = require('../controllers/contactController');

// ------------------------------
// Define all Contact API routes
// ------------------------------

// GET all contacts
// URL: /api/contacts
router.get('/', contactController.getAllContacts);

// GET a single contact by ID
// URL: /api/contacts/:id
router.get('/:id', contactController.getContactById);

// CREATE a new contact
// URL: /api/contacts
router.post('/', contactController.createContact);

// UPDATE an existing contact by ID
// URL: /api/contacts/:id
router.put('/:id', contactController.updateContact);

// DELETE a contact by ID
// URL: /api/contacts/:id
router.delete('/:id', contactController.deleteContact);

// DELETE all contacts
// URL: /api/contacts
router.delete('/', contactController.deleteAllContacts);

// Export the router to use in server.js
module.exports = router;
