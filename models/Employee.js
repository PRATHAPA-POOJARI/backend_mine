const mongoose = require('mongoose');

// Define the schema for Employee
const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    age: { type: Number, required: true }  // Added age field
});

// Export the Employee model
module.exports = mongoose.model('Employee', employeeSchema);
