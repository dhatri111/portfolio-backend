const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', controller.getAllContacts);
router.get('/:id', controller.getContactById);

// PROTECTED
router.post('/', auth, controller.createContact);
router.put('/:id', auth, controller.updateContact);
router.delete('/:id', auth, controller.deleteContact);
router.delete('/', auth, controller.deleteAllContacts);

module.exports = router;
