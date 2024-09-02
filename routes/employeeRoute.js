const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController'); 

// Route to get all employees
router.get('/', employeeController.getEmployees);

// Route to create a new employee
router.post('/', employeeController.createEmployee);

// Route to update an employee by ID
router.put('/:id', employeeController.updateEmployee);

// Route to delete an employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;