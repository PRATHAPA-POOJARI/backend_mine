// Ensure all methods are correctly defined and exported
const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { username, lastname, email, phone, state, age } = req.body;
    const newEmployee = new Employee({ username, lastname, email, phone, state, age });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${duplicateField} already registered` });
    }
    res.status(400).json({ message: 'Bad request', error });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, lastname, email, phone, state, age } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { username, lastname, email, phone, state, age },
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
