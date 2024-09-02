const mongoose = require('mongoose');

// Define the schema for Student
const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true,unique:true },
    state: { type: String, required: true }
});

// Export the Student model
module.exports = mongoose.model('Student', studentSchema);
