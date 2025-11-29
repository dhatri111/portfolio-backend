const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);

// PROTECTED
router.post('/', auth, contactController.createContact);
router.put('/:id', auth, contactController.updateContact);
router.delete('/:id', auth, contactController.deleteContact);
router.delete('/', auth, contactController.deleteAllContacts);

module.exports = router;
