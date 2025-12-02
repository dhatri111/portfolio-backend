const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// PUBLIC
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.addUser);

// PROTECTED
router.put('/:id', auth, controller.updateUser);
router.delete('/:id', auth, controller.deleteUser);
router.delete('/', auth, controller.deleteAllUsers);

module.exports = router;
