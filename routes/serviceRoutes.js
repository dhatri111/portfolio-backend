const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// PROTECTED
router.post('/', auth, serviceController.addService);
router.put('/:id', auth, serviceController.updateService);
router.delete('/:id', auth, serviceController.deleteService);
router.delete('/', auth, serviceController.deleteAllServices);

module.exports = router;
