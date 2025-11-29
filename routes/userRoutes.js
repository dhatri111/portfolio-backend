const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// PUBLIC AUTH
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

// PUBLIC CRUD
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);

// PROTECTED CRUD (only edit/delete require auth)
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);
router.delete('/', auth, userController.deleteAllUsers);

module.exports = router;
