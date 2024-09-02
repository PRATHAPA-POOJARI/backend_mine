// const Student = require('../models/Student');

// // Get all students
// const getStudents = async (req, res) => {
//     try {
//         const students = await Student.find();
//         res.json(students);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Create a new student
// // Create a new student
// const createStudent = async (req, res) => {
//     try {
//         const { username, lastname, email, phone, state } = req.body;
//         const newStudent = new Student({ username, lastname, email, phone, state });
//         await newStudent.save();
//         res.status(201).json(newStudent);
//     } catch (error) {
//         // Check for duplicate key error
//         if (error.code === 11000) {
//             const duplicateField = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error
//             return res.status(400).json({ message: `${duplicateField} already registered` });
//         }
//         res.status(400).json({ message: 'Bad request', error });
//     }
// };


// // Update an existing student
// const updateStudent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { username, lastname, email, phone, state } = req.body;
//         const updatedStudent = await Student.findByIdAndUpdate(
//             id,
//             { username, lastname, email, phone, state },
//             { new: true, runValidators: true }
//         );
//         if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
//         res.json(updatedStudent);
//     } catch (error) {
//         res.status(400).json({ message: 'Bad request', error });
//     }
// };

// // Delete a student
// const deleteStudent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedStudent = await Student.findByIdAndDelete(id);
//         if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
//         res.json({ message: 'Student deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Export the controller functions
// module.exports = {
//     getStudents,
//     createStudent,
//     updateStudent,
//     deleteStudent
// };
const Student = require('../models/Student');

const printAllStudents = async () => {
    try {
      const students = await Student.find();
      if (students.length === 0) {
        console.log('\nStudents Collection is Empty');
      } else {
        console.log('\nUpdated Students Collection:');
        students.forEach((student, index) =>
          console.log(`${index + 1}:`, student)
        );
      }
    } catch (error) {
      console.error('Error fetching students for printing:', error);
    }
  };
  
  // Get all students
  module.exports.getStudents = async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Create a new student
  module.exports.createStudent = async (req, res) => {
    try {
      const { username, lastname, email, phone, state } = req.body;
      const newStudent = new Student({ username, lastname, email, phone, state });
      await newStudent.save();
      res.status(201).json(newStudent);
  
      // Print updated students collection
      printAllStudents();
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        return res
          .status(400)
          .json({ message: `${duplicateField} already registered` });
      }
      res.status(400).json({ message: 'Bad request', error });
    }
  };
  
  // Update an existing student
  module.exports.updateStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, lastname, email, phone, state } = req.body;
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { username, lastname, email, phone, state },
        { new: true, runValidators: true }
      );
      if (!updatedStudent)
        return res.status(404).json({ message: 'Student not found' });
      res.json(updatedStudent);
  
      // Print updated students collection
      printAllStudents();
    } catch (error) {
      res.status(400).json({ message: 'Bad request', error });
    }
  };
  
  // Delete a student
  module.exports.deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent)
        return res.status(404).json({ message: 'Student not found' });
      res.json({ message: 'Student deleted successfully' });
  
      // Print updated students collection
      printAllStudents();
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  // Export the controller functions
  // module.exports = {
  //   getStudents,
  //   createStudent,
  //   updateStudent,
  //   deleteStudent,
  // };
  