// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
// const userController = require('../controllers/StudentController');
// In-memory user store
let users = []; // This should be replaced with a proper database in production
router.get('/api/users', userController.getUsers);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);
module.exports = router;



