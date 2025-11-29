const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceController');
const auth = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', controller.getAllServices);
router.get('/:id', controller.getServiceById);

// PROTECTED
router.post('/', auth, controller.addService);
router.put('/:id', auth, controller.updateService);
router.delete('/:id', auth, controller.deleteService);
router.delete('/', auth, controller.deleteAllServices);

module.exports = router;
