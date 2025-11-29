const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// SIGN UP
router.post('/signup', userController.signup);

// SIGN IN
router.post('/signin', userController.signin);

module.exports = router;
