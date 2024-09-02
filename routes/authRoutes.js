// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Adjust the path as needed

// Route to handle user registration
router.post('/register', authController.register);

// Route to handle user login
router.post('/login', authController.login);

module.exports = router;
